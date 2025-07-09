import React, { useState } from 'react';
import Header from './Components/Header';
import DashboardContent from './Components/DashboardContent';
import Sidebar from './Components/Sidebar';
import DataTableContent from './Components/DataTableContent';
import './index.css'; // Make sure to import your main CSS file for Tailwind

function App() {
    const [activeTab, setActiveTab] = useState('table'); // State to manage active tab

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <> {/* Use a fragment as the #root div already exists in index.html */}
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-8 overflow-y-auto"> {/* flex-1 to take remaining space, p-8 for padding */}
                <Header />
                {/* Conditionally render content based on activeTab */}
                {/* {activeTab === 'dashboard' && <DashboardContent />} */}
                {activeTab === 'table' && <DataTableContent />}
            </main>
        </>
    );
}

export default App;