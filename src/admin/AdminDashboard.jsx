import React, { useState } from 'react';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import UploadMovie from './UploadMovie';
import UploadEpisode from './UploadEpisode';

import MoviesList from './MoviesList';
import AllMovies from './AllMovies';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import './AdminPage.css';



const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const adminName = "John Doe"; // Replace with actual admin name
  const adminInitial = adminName ? adminName[0] : ''; // Extract the first letter for initials

  return (
    <div className='admin-page'>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`admin-navbar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <AdminNavbar toggleSidebar={toggleSidebar} adminInitial={adminInitial}
        adminName={adminName} />
      </div>
      
      {/* Other content */}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        
        <div className="content">
          
          <h2>Dashboard Content</h2>
          <Outlet /> {/* This is where the nested routes will be rendered */}

          {/* Your admin dashboard content goes here */}
          <nav>
            <Link to="admin/movies">Movies List</Link>
            <Link to="admin/uploadMovie">Add Movie</Link>
            <Link to="admin/edit-movie">Edit Movie</Link>
          </nav>
          <main>
            <Routes>
              <Route path="/admin/movies" element={<AllMovies />} />
              <Route path="/admin/upload-movie" element={<UploadMovie />} />
              <Route path="/admin/edit-movie" element={<MoviesList />} />
              <Route path="/admin/upload-episode" element={<UploadEpisode />} />

            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
