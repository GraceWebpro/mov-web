import React from 'react';
import './App.css';
import HomeHeader from './components/home/HomeHeader';
import MovieDetail from './components/movie/MovieDetail';
import About from './components/about/About';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import AdminAuth from './admin/AdminAuth';
import { AuthProvider } from './admin/AuthContext';
import PrivateRoute from './admin/PrivateRoute';
//import { Navigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';



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
        
          
          {/* Protected admin routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/" element={ <HomeHeader/> } />
                <Route path="/" element={ <HomeHeader/> } />
                <Route path="/admin/login" element={ <AdminAuth/> } />

        <Route path="about" element={ <About/> } />
        <Route path="movies/:id" element={<MovieDetail />} /> {/* Route for movie details */}

      </Routes>
      <Footer />
      </AuthProvider>
      
    </div>
  );
}

export default App;
