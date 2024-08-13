import React, { useState, useEffect } from 'react';
//import { auth } from '../config/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      try {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
    });
    return unsubscribe;
      } catch (error) {
          alert('there is an error', error.message);
      }
  }, []);


  return (
    <div>
    {children}
    </div>
  );
};

export default AuthProvider;

