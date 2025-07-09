import React from 'react';

function Sidebar({ activeTab, onTabChange }) {
    return (
        <aside className="w-64 bg-gray-800 text-white p-6 shadow-lg flex flex-col justify-between">
            <div>
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-green-400">Meeting Panel</h2>
                </div>
                <nav>
                    <ul>
                        {/* <li className="mb-3">
                            <a
                                href="#dashboard"
                                className={`block py-3 px-4 rounded-md text-lg transition-all duration-200 ${
                                    activeTab === 'dashboard'
                                        ? 'bg-gray-700 text-green-400 font-semibold'
                                        : 'hover:bg-gray-700 hover:text-green-300'
                                }`}
                                onClick={() => onTabChange('dashboard')}
                            >
                                Dashboard
                            </a>
                        </li> */}
                        <li className="mb-3">
                            <a
                                href="#data-table"
                                className={`block py-3 px-4 rounded-md text-lg transition-all duration-200 ${
                                    activeTab === 'table'
                                        ? 'bg-gray-700 text-green-400 font-semibold'
                                        : 'hover:bg-gray-700 hover:text-green-300'
                                }`}
                                onClick={() => onTabChange('table')}
                            >
                               Meetings
                            </a>
                        </li>
                        {/* Add more sidebar links here if needed */}
                    </ul>
                </nav>
            </div>
            <div className="text-center text-gray-500 text-sm mt-8">
                &copy; {new Date().getFullYear()} Admin Dashboard
            </div>
        </aside>
    );
}

export default Sidebar;