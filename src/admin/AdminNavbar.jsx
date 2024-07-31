// src/components/Navbar.js
import React from 'react';
import { FaBars } from 'react-icons/fa';

const AdminNavbar = ({ toggleSidebar, isSidebarOpen, adminInitial, adminName }) => {
  return (
    <div className={`admin-navbar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h1>Dashboard</h1>
      <div className="admin-details">
        <div className="admin-avatar">
          {adminInitial} {/* Display the initial */}
        </div>
        <span className="admin-username">{adminName}</span> {/* Display the admin name */}
      </div>
      {/* Add other navbar items here */}
    </div>
  );
};

export default AdminNavbar;
