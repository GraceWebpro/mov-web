import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UploadMovie from './UploadMovie';
import MoviesList from './MoviesList';
import AllMovies from './AllMovies';

const AdminDashboard = () => {
  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
        <nav>
          <Link to="admin/movies">Movies List</Link>
          <Link to="admin/uploadMovie">Add Movie</Link>
          <Link to="admin/edit-movie">Edit Movie</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="movies" element={<AllMovies />} />
          <Route path="uploadMovie" element={<UploadMovie />} />
          <Route path="editMovies" element={<MoviesList />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
