import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import './AdminAuth.css'
import { auth } from '../config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('User logged in!');
        window.location.href='/admin/dashboard';
        //navigate('/admin/dashboard'); // Redirect to the dashboard after login
      } catch (error) {
        console.error('Login failed:', error.message);
        alert('User not logged in');
      }
    };

    
  

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className='form-container'>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
};

export default LoginPage;
