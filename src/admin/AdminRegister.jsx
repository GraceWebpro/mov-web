import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAuth.css'
import { auth, db } from '../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registerUser = async (e) => {
      e.preventDefault();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered successfully!');
        navigate('/admin/dashboard'); // Redirect to the dashboard after login
        
      } catch (error) {
        console.error('Login failed:', error.message);
        alert('User not registered!');
      }
    }
    
    
    
  

  return (
    <div className="login-page">
      <form onSubmit={registerUser} className='form-container'>
        <h2>Admin Register</h2>


        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
};

export default AdminRegister;
