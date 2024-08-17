// src/components/Navbar.js
import React from 'react';
import { FaBars } from 'react-icons/fa';

const AdminNavbar = ({ toggleSidebar, isSidebarOpen, adminInitial, adminName }) => {
  return (
    <div className={`admin-navbar ${isSidebarOpen ? 'navbar-open' : 'navbar-closed'}`}>
      <div className='navbar-left'>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h1>Admin</h1>
      </div>
      <div className="admin-avatar">
        {adminInitial} {/* Display the initial */}
      </div>
      {/* Add other navbar items here */}
    </div>
  );
};

export default AdminNavbar;
