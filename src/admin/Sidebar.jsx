// src/components/Sidebar.js
import React  from 'react';
import { FaRegUserCircle, FaEdit } from 'react-icons/fa';
import { MdDashboard, MdOutlineLibraryAdd } from 'react-icons/md'
import logo from '../logo.svg';
import { Link, useLocation } from "react-router-dom";
import { RiVideoUploadLine } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';
import { auth } from '../config/Firebase';
import { signOut } from 'firebase/auth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Handler for user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect or handle post-logout behavior here
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };


  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <Link to="/" className="nav__logo">
            <img src={logo} alt='logo' width='38' height='38' /><span className="sidebar-text"> Movie Stream </span>
        </Link>
      </div>
      <nav className='side-nav'>
        <ul className='side-ul'>
          <Link to='/admin' style={{ color: '#fff' }}> <li className={location.pathname === '/admin' ? 'active' : ''}>
            <MdDashboard style={{ width: '18', height: '18' }} />
            <span className="sidebar-text">Home</span>
          </li></Link>
          <Link to='/admin/upload-movie' style={{ color: '#fff' }}><li className={location.pathname === '/admin/upload-movie' ? 'active' : ''}>
            <RiVideoUploadLine style={{ width: '18', height: '18' }} />
            <span className="sidebar-text">Upload Movie</span>
          </li></Link>
          <Link to='/admin/upload-episode' style={{ color: '#fff' }}><li className={location.pathname === '/admin/upload-episode' ? 'active' : ''}>
            <MdOutlineLibraryAdd style={{ width: '18', height: '18' }} />
            <span className="sidebar-text">Upload Episode</span>
          </li></Link>
          <Link to='/admin/edit-movie' style={{ color: '#fff' }}> <li className={location.pathname === '/admin/edit-movie' ? 'active' : ''}>
            <FaEdit style={{ width: '18', height: '18' }} />
            <span className="sidebar-text">Edit Movie</span>
          </li></Link>
          <Link to='/admin/account' style={{ color: '#fff' }}><li className={location.pathname === '/admin/account' ? 'active' : ''}>
            <FaRegUserCircle style={{ width: '18', height: '18' }} />
            <span className="sidebar-text">Account</span>
          </li></Link>
          <li onClick={handleLogout}>
            <TbLogout style={{ width: '18', height: '18' }} />
            <span className="sidebar-text">Log Out</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
