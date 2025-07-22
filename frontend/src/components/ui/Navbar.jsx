import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from '../shared/SearchBar';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    navigate(`/home/questions?keyword=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Brand Logo */}
          <div className="flex-shrink-0">
            <Link to={isAuthenticated && user ? '/home/questions' : '/login'} className="text-2xl font-bold text-indigo-600">
              QueryFlow
            </Link>
          </div>

          {/* Middle Section: Search Bar (only shown when authenticated) */}
          {isAuthenticated && (
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
              <SearchBar onSearch={handleSearch} />
            </div>
          )}

          {/* Right Section: Auth buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <button 
                onClick={logout} 
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-baseline space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
