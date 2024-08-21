import React, { useState } from 'react'
//import { NavLink } from 'react-router-dom'
import { Link } from "react-router-dom";
//import { RiCloseLine } from "react-icons/ri";
//import { RiArrowDropDownLine } from "react-icons/ri";
import './Navbar.css'
import { RiMenuUnfold3Fill } from "react-icons/ri";
import logo from '../../logo.svg';
import NavSearch from '../home/search/NavSearch';


const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
      <header className='header'>
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <Link to="/" className="nav__logo">
                <img src={logo} alt='logo' width='30' height='30' /> Movie Stream 
            </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
        <RiMenuUnfold3Fill />
        </div>
        
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
          <li className="nav__item">
             <Link to="/" className="nav__link" >
               Home
             </Link>
           </li>
           <li className="nav__item">
             <Link to="k-drama" className="nav__link">
               Korea Drama 
             </Link>
           </li>
           <li className="nav__item">
             <Link
               to="nollywood"
               className="nav__link"
             >
               Nollywood 
             </Link>
           </li>
           <li className="nav__item">
             <Link
               to="tv-series"
               className="nav__link"
             >
               How to download
             </Link>
           </li>
           <NavSearch />
          </ul>
        </div>
      </div>
    </nav>
    </header>
  )
}

export default Navbar