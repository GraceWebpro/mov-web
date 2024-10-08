import React, { useState, useEffect } from 'react';
import { auth } from '../config/Firebase';

import { updatePassword, signOut } from 'firebase/auth';
//import MoviesList from './MoviesList';
//mport AllMovies from './AllMovies';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import './AdminPage.css';

const UserAccount = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
const user = auth.currentUser;


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
  };

  

  async function handleLogout() {
    try {
      await signOut(auth);
      window.location.href='/admin/login';
    } catch (error) {
      console.error('User logged out!', error.message);
    }
  }

  const handleSubmit = async(e) => {
      e.preventDefault();
    if(newPassword !== confirmPassword) {
        setError('Passwords do not match!');
        return;
    }
    try {
        await updatePassword(user, newPassword);
        setError(null);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    } catch (error) {
        setError('Failed to update password!');
    }
  };


  const adminName = user ? user.displayName || 'Admin' : 'Admin'; // Use displayName if available
  const adminInitial = adminName ? adminName[1] : ''; // Extract the first letter for initials

  return (
    <div className='admin-page'>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`admin-navbar ${isSidebarOpen ? 'navbar-open' : 'navbar-closed'}`}>
        <AdminNavbar toggleSidebar={toggleSidebar} adminInitial={adminInitial}
        adminName={adminName} />
      </div>      
      {/* Other content */}
      <div className={`main-content ${isSidebarOpen ? 'content-open' : 'content-closed'}`}>
      
            <div className="content">
                <h3>Welcome </h3>
                <p>Email: </p>
                <form onSubmit={handleSubmit} className='form-container'>
                    <h2>Change Password</h2>
                    <label>Current Password:
                    <input 
                    type='password' 
                    value={currentPassword} 
                    onChange={ e => setCurrentPassword(e.target.value)} 
                    /></label>
                    <br />
                    <label>New Password:
                    <input            
                    type='password' 
                    value={newPassword} 
                    onChange={ e => setNewPassword(e.target.value)} 
                    /></label>
                    <br />
                    <label>Confirm Password:
                    <input            
                    type='password' 
                    value={confirmPassword} 
                    onChange={ e => setConfirmPassword(e.target.value)} 
                    /></label>
                    <br />
                    {error && <p style={{ color: 'red', marginBottom: '20px', }}>{error}</p>}
                    <button type='submit'>Update Password</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default UserAccount;
