import React from 'react';
import './App.css';
import HomeHeader from './components/home/HomeHeader';
import About from './components/about/About';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={ <HomeHeader/> } />
        <Route path="about" element={ <About/> } />
      </Routes>
    </div>
  );
}

export default App;
