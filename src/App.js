import React from 'react';
import './App.css';
import HomeHeader from './components/home/HomeHeader';
import MovieDetail from './components/movie/MovieDetail';
//import About from './components/about/About';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
//import Footer from './components/footer/Footer';
import AdminAuth from './admin/AdminAuth';
import AdminRegister from './admin/AdminRegister';
import AdminDashboard from './admin/AdminDashboard';
import UploadMovie from './admin/UploadMovie';
import UploadEpisode from './admin/UploadEpisode';
import EditMovie from './admin/EditMovies';
import UserAccount from './admin/UserAccount';
import {auth} from './config/Firebase';
import ScrollToTop from './components/ScrollToTop';
import Drama from './components/movie/Drama';
import Nollywood from './components/movie/Nollywood';
import HowTo from './components/movie/HowTo'
import EpDownload from './components/movie/EpDownload'

function App() {
  const user = auth.currentUser;

  const location = useLocation();

  // Determine if the current route is for the admin page
  const isAdminPage = location.pathname.startsWith('/admin');



  return (
    
    <div className="App">

        {/* Conditionally render Navbar */}
        {!isAdminPage && <Navbar />}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeHeader />} />
          <Route path='/k-drama' element={<Drama />} />
          <Route path='/nollywood' element={<Nollywood />} />
          <Route path='/how-to-download' element={<HowTo />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="movies/:id" element={<MovieDetail />} />
          <Route path="/movies/:title/episode/:episodeNumber" element={<EpDownload />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={user ? <Navigate to='/admin/dashboard' /> : <Navigate to='/admin/login' />} />
          <Route path="/admin/upload-movie" element={<UploadMovie />} />
          <Route path="/admin/upload-episode" element={<UploadEpisode />} />
          <Route path="/admin/edit-movie" element={<EditMovie />} />
          <Route path="/admin/account" element={<UserAccount />} />
          <Route path="/admin/edit-movie/:id" element={<EditMovie />} />

          <Route path="/admin/login" element={<AdminAuth />} />
          <Route path="/admin/signup" element={<AdminRegister />} />
          {/* Redirect to home for unmatched routes */}
          {/*<Route path="*" element={<Navigate to="/" />} />*/}
        </Routes>

        
    <ScrollToTop />
    </div>
  );
}

export default App;
