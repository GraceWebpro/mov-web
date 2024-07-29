import React from 'react';
import './App.css';
import HomeHeader from './components/home/HomeHeader';
import MovieDetail from './components/movie/MovieDetail';
import About from './components/about/About';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import AdminDashboard from './admin/AdminDashboard';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomeHeader/> } />
        <Route path="about" element={ <About/> } />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="movies/:id" element={<MovieDetail />} /> {/* Route for movie details */}

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
