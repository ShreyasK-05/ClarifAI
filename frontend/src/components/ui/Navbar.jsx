import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const activeLinkStyle = {
    color: '#4f46e5', // This is Tailwind's indigo-600
    fontWeight: '600'
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            {/* FIX: Added a check for 'user' before accessing its properties */}
            <Link to={isAuthenticated && user ? (user.role === 'admin' ? '/admin' : '/home') : '/'} className="text-2xl font-bold text-indigo-600">
              ClarifAI
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isAuthenticated ? (
                <>
                  {/* This optional chaining already prevents a crash here, but the Link above was the source of the error. */}
                  {user?.role === 'admin' && (
                    <NavLink 
                      to="/admin" 
                      className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  <NavLink 
                    to="/home" 
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  >
                    Home
                  </NavLink>
                  <button 
                    onClick={logout} 
                    className="bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/login" 
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/signup" 
                    className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    style={({ isActive }) => isActive ? { ...activeLinkStyle, color: 'white' } : undefined}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
          {/* You can add a mobile menu button here if needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
