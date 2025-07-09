import React from 'react';

function DashboardContent() {
    return (
        <div id="dashboard-content" className="bg-gray-900 text-gray-100 p-8 rounded-xl shadow-2xl animate-fade-in">
            <h2 className="text-4xl font-extrabold text-white mb-6 border-b border-gray-700 pb-4">
                Dashboard Overview
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                Here's a concise summary of your key performance indicators, crucial metrics, and recent activities.
            </p>

            {/* Stats Grid - Enhanced with Gradients and Larger Shadows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Total Users Card */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-600">
                    <h3 className="text-2xl font-bold text-blue-100 mb-3 tracking-wide">Total Users</h3>
                    <p className="text-6xl font-extrabold text-white leading-tight">1,234</p>
                    <span className="text-sm text-blue-200 mt-2 block">Registered Accounts</span>
                </div>

                {/* New Orders Card */}
                <div className="bg-gradient-to-br from-green-700 to-green-900 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-green-600">
                    <h3 className="text-2xl font-bold text-green-100 mb-3 tracking-wide">New Orders</h3>
                    <p className="text-6xl font-extrabold text-white leading-tight">567</p>
                    <span className="text-sm text-green-200 mt-2 block">Processed Today</span>
                </div>

                {/* Total Revenue Card */}
                <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-600">
                    <h3 className="text-2xl font-bold text-purple-100 mb-3 tracking-wide">Total Revenue</h3>
                    <p className="text-6xl font-extrabold text-white leading-tight">$123,456</p>
                    <span className="text-sm text-purple-200 mt-2 block">Accumulated Earnings</span>
                </div>
            </div>

            {/* Quick Insights Section - Modernized */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                    Quick Insights
                </h3>
                <ul className="space-y-4 text-gray-300 text-lg">
                    <li className="flex items-center">
                        <span className="text-orange-400 font-bold w-6">→</span>
                        Pending tasks: <span className="font-extrabold text-orange-400 ml-2">5 urgent items</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-400 font-bold w-6">→</span>
                        Recent activities: <span className="ml-2">User Alice updated profile and password</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-red-400 font-bold w-6">→</span>
                        System alerts: <span className="ml-2 font-bold text-red-400">Database backup overdue!</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-blue-400 font-bold w-6">→</span>
                        New feature requests: <span className="ml-2">3 items received this week</span>
                    </li>
                </ul>
            </div>

         
        </div>
    );
}

export default DashboardContent;