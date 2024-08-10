import React from 'react';
import './App.css';
import HomeHeader from './components/home/HomeHeader';
import MovieDetail from './components/movie/MovieDetail';
//import About from './components/about/About';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import AdminAuth from './admin/AdminAuth';
import { AuthProvider } from './admin/AuthContext';
import PrivateRoute from './admin/PrivateRoute';
//import { Navigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import UploadMovie from './admin/UploadMovie';
import UploadEpisode from './admin/UploadEpisode';
import EditMovie from './admin/EditMovies';
import UserAccount from './admin/UserAccount';
//import { AuthWrapper } from './admin/AuthWrapper';


function App() {

  const location = useLocation();

  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');



  return (
    
    <div className="App">
    <AuthProvider>

        {/* Conditionally render Navbar */}
        {!isAdminPage && <Navbar />}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeHeader />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="movies/:id" element={<MovieDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute> <AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/upload-movie" element={<UploadMovie />} />
          <Route path="/admin/upload-episode" element={<UploadEpisode />} />
          <Route path="/admin/edit-movie" element={<EditMovie />} />
          <Route path="/admin/account" element={<UserAccount />} />

          <Route path="/admin/login" element={<AdminAuth />} />
          {/* Redirect to home for unmatched routes */}
          {/*<Route path="*" element={<Navigate to="/" />} />*/}
        </Routes>

        
        <Footer />
      </AuthProvider>

    </div>
  );
}

export default App;
