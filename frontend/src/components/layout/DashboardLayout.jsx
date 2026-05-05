import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../shared/SideNavBar'; // Make sure you place your SideNavBar.jsx in the shared folder

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-off-white text-on-surface font-body-regular flex">
      {/* Left Sidebar Fixed Navigation */}
      <SideNavBar />
      
      {/* Main Content Area - Pushed right by the sidebar on large screens */}
      <main className="flex-1 lg:ml-[248px] w-full max-w-layout-max mx-auto p-md md:p-xl lg:p-xxl overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;