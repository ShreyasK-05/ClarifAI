import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminRoute = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    // If user is logged in but not an admin, redirect to user homepage
    // or show an 'unauthorized' page. Redirecting to home is user-friendly.
    return <Navigate to="/home" replace />;
  }

  return <Outlet />; // Render the child admin route component
};

export default AdminRoute;
