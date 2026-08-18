import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../src/component/admin/Navbar";


const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar/>

      <main className="lg:ml-72 pt-20 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;