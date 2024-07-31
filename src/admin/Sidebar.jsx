// src/components/Sidebar.js
import React  from 'react';
import { FaRegUserCircle, FaEdit } from 'react-icons/fa';
import { MdDashboard, MdOutlineLibraryAdd } from 'react-icons/md'
import logo from '../logo.svg';
import { Link } from "react-router-dom";
import { RiVideoUploadLine } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <Link to="/" className="nav__logo">
            <img src={logo} alt='logo' width='38' height='38' /><span className="sidebar-text"> Movie Stream </span>
        </Link>
      </div>
      <nav>
        <ul>
          <li><MdDashboard style={{ width: '18', height: '18'}} /><Link to='/admin/movies'> <span className="sidebar-text">Home</span></Link></li>
          <li><RiVideoUploadLine style={{ width: '18', height: '18'}} /><Link to='/admin/upload-movie'> <span className="sidebar-text">Upload Movie</span></Link></li>
          <li><MdOutlineLibraryAdd style={{ width: '18', height: '18'}} /><Link to='/admin/upload-episode'> <span className="sidebar-text">Upload Episode</span></Link></li>
          <li><FaEdit style={{ width: '18', height: '18'}} /><Link to='/admin/edit-movie'> <span className="sidebar-text">Edit Movie</span></Link></li>
          <li><FaRegUserCircle style={{ width: '18', height: '18'}} /> <Link to='/admin/account'><span className="sidebar-text">Account</span></Link></li>
          <li><TbLogout style={{ width: '18', height: '18'}} /> <Link to='/admin/logout'><span className="sidebar-text">Log Out</span></Link></li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
