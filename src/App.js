import React from 'react';
import './App.css';
import HomeHeader from './components/home/HomeHeader';
import About from './components/about/About';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomeHeader/> } />
        <Route path="about" element={ <About/> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
