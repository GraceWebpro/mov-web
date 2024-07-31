import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './AdminAuth.css'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, login } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) {
        navigate('/admin/dashboard'); // Redirect authenticated users away from the login page
      }
    }, [user, navigate]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(email, password);
        navigate('/admin/dashboard'); // Redirect to the dashboard after login
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
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
  );
};

export default LoginPage;
