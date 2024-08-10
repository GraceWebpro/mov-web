import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../config/Firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthWrapper = (component) => {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

    });
    return () => unsubscribe();
  }, []);


    if (!user) {
        return <Navigate to='/admin/login' />
    }

  return <component />;
};

export const useAuth = () => useContext(AuthContext);