import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // If there is no user, redirect to login page
  return user ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
