import React, { useState, useMemo, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';

function DataTableContent() {
    // State to hold the fetched data
    const [data, setData] = useState([]);
    // State for global search filter
    const [globalFilter, setGlobalFilter] = useState('');
    // State for sorting
    const [sorting, setSorting] = useState([]);
    // State for loading status
    const [loading, setLoading] = useState(true);
    // State for error messages
    const [error, setError] = useState(null);

    // Function to fetch data from the API
    const fetchData = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await fetch('https://app.grabfood.hk/api/buttar/sessions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other necessary headers, like Authorization if required by the API
                    // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
                },
            });

            if (!response.ok) {
                // If response is not OK (e.g., 404, 500), throw an error
                const errorText = await response.text(); // Get more detailed error message
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            // Assuming the API directly returns the array of session objects
            setData(result);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            setError(`Failed to load data: ${err.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle session cancellation
    const handleCancelSession = async (sessionId, personName) => {
        if (!window.confirm(`Are you sure you want to cancel the session for ${personName}?`)) {
            return; // User cancelled the confirmation
        }

        try {
            // Construct the cancellation URL with the session ID
            const cancelUrl = `https://app.grabfood.hk/api/buttar/sessions/cancel/${sessionId}`;
            
            const response = await fetch(cancelUrl, {
                method: 'POST', // Use POST method as specified
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authorization headers if needed
                    // 'Authorization': 'Bearer YOUR_AUTH_TOKEN'
                },
                // If the API expects a body for cancellation, add it here
                // body: JSON.stringify({ reason: 'User requested cancellation' }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Cancellation failed! Status: ${response.status} - ${errorText}`);
            }

            // Optional: Reload data after successful cancellation to reflect changes
            // Or update the local state to change the status of the cancelled session
            alert(`Session for ${personName} (ID: ${sessionId.substring(0, 8)}...) cancelled successfully!`);
            fetchData(); // Refresh the table data

        } catch (err) {
            console.error("Cancellation error:", err);
            alert(`Error cancelling session for ${personName}: ${err.message}`);
        }
    };

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this runs once on mount

    // Helper function to get status-specific Tailwind CSS classes
    const getStatusClasses = (status) => {
        let classes = 'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full';
        switch (status) {
            case 'booked':
                classes += ' bg-green-100 text-green-800';
                break;
            case 'pending':
                classes += ' bg-yellow-100 text-yellow-800';
                break;
            case 'cancelled':
                classes += ' bg-red-100 text-red-800';
                break;
            default:
                classes += ' bg-gray-100 text-gray-800';
        }
        return classes;
    };

    // Column definitions for React Table
    const columns = useMemo(
        () => [
            {
                accessorKey: '_id',
                header: 'Entry ID',
                cell: info => info.getValue().substring(0, 8) + '...', // Shorten ID for display
            },
            {
                accessorFn: row => row.userSubmissionId?.personName || 'N/A', // Access nested property, handle potential undefined
                id: 'personName',
                header: 'Person Name',
                cell: info => info.getValue(),
            },
            {
                accessorFn: row => row.userSubmissionId?.businessNature || 'N/A',
                id: 'businessNature',
                header: 'Business Nature',
                cell: info => info.getValue(),
            },
            {
                accessorFn: row => row.userSubmissionId?.registeredAddress || 'N/A',
                id: 'registeredAddress',
                header: 'Registered Address',
                cell: info => info.getValue(),
            },
            {
                accessorFn: row => row.userSubmissionId?.shareCapital !== undefined ? `$${row.userSubmissionId.shareCapital.toLocaleString()}` : 'N/A',
                id: 'shareCapital',
                header: 'Share Capital',
                cell: info => info.getValue(),
            },
            {
                accessorFn: row => row.userSubmissionId?.shareholders?.map(s => s.name).join(', ') || 'N/A',
                id: 'shareholders',
                header: 'Shareholders',
                cell: info => info.getValue(),
            },
            {
                accessorFn: row => row.userSubmissionId?.directors !== undefined ? row.userSubmissionId.directors : 'N/A',
                id: 'directors',
                header: 'Directors',
                cell: info => info.getValue(),
            },
            {
                accessorFn: row => row.userSubmissionId?.createdAt ? new Date(row.userSubmissionId.createdAt).toLocaleDateString('en-GB') : 'N/A',
                id: 'createdAt',
                header: 'Submission Date',
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: info => {
                    const status = info.getValue();
                    return <span className={getStatusClasses(status)}>{status}</span>;
                },
            },
            {
                id: 'documents',
                header: 'Documents',
                cell: ({ row }) => (
                    <div className="flex space-x-2">
                        {row.original.userSubmissionId?.passportOrHKID && (
                            <a
                                href={row.original.userSubmissionId.passportOrHKID}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline text-sm"
                            >
                                ID
                            </a>
                        )}
                        {row.original.userSubmissionId?.residentialProofUrl && (
                            <a
                                href={row.original.userSubmissionId.residentialProofUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline text-sm"
                            >
                                Proof
                            </a>
                        )}
                    </div>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex space-x-2">
                     
                        {row.original.status === 'pending' && (
                            <button className="text-green-600 hover:text-green-900 transition-colors duration-200 text-sm"
                                    onClick={() => alert(`Approving submission for: ${row.original.userSubmissionId?.personName || 'N/A'}`)}>
                                Approve
                            </button>
                        )}
                        {/* Cancel Button */}
                        {(row.original.status === 'booked' || row.original.status === 'pending') && (
                            <button
                            type="button" // Added type="button" for semantic correctness
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
                            onClick={() => handleCancelSession(row.original._id, row.original.userSubmissionId?.personName || 'N/A')}
                        >
                            Cancel
                        </button>
                        )}
                    </div>
                ),
            },
        ],
        []
    );

    // Initialize React Table instance
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    });

    return (
        <div id="table-content" className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Application Submissions</h2>
            <p className="text-lg text-gray-600 mb-8">Manage and review user application submissions and their Calendly booking statuses.</p>

            {/* Global Search Input and Refresh Button */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <input
                    type="text"
                    value={globalFilter ?? ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Search all columns..."
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3"
                />
                <button
                    className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 w-full md:w-auto"
                    onClick={fetchData} // Call fetchData on click
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Loading...' : 'Refresh Data'}
                </button>
            </div>

            {/* Loading, Error, or Table Content */}
            {loading && (
                <div className="text-center py-10 text-blue-600 text-xl">
                    Loading data...
                </div>
            )}
            {error && (
                <div className="text-center py-10 text-red-600 text-xl border border-red-300 bg-red-50 rounded-md p-4">
                    Error: {error}
                </div>
            )}
            {!loading && !error && (
                <>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white border-collapse rounded-lg overflow-hidden shadow-sm">
                            <thead className="bg-gray-200">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300 cursor-pointer"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                {{
                                                    asc: ' �',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted()] ?? null}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="py-3 px-4 whitespace-nowrap text-md text-gray-900">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {table.getRowModel().rows.length === 0 && (
                                    <tr>
                                        <td colSpan={columns.length} className="py-8 text-center text-gray-500">
                                            No data found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </button>
                            <span className="text-gray-700">
                                Page{' '}
                                <strong>
                                    {table.getState().pagination.pageIndex + 1} of{' '}
                                    {table.getPageCount()}
                                </strong>
                            </span>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">Go to page:</span>
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    table.setPageIndex(page);
                                }}
                                className="p-2 border border-gray-300 rounded-md w-20 text-center"
                            />
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={e => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                                className="p-2 border border-gray-300 rounded-md"
                            >
                                {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </>
            )}

         
        </div>
    );
}

export default DataTableContent;