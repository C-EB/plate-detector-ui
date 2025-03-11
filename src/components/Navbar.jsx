// src/components/Navbar.jsx - Updated to center menu items

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-primary-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16">
          {/* Logo/Title - Centered on mobile, left on larger screens */}
          <div className="flex justify-center sm:justify-start py-3 sm:py-0">
            <span className="text-white text-xl font-bold">Moroccan Plate Detector</span>
          </div>
          
          {/* Navigation Links - Centered on all screen sizes */}
          <div className="flex justify-center w-full sm:w-auto py-2 sm:py-0">
            <div className="flex space-x-8">
              <Link
                to="/"
                className={`${
                  isActive('/') 
                    ? 'border-primary-300 text-white' 
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                to="/history"
                className={`${
                  isActive('/history') 
                    ? 'border-primary-300 text-white' 
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                History
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive('/about') 
                    ? 'border-primary-300 text-white' 
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                About
              </Link>
            </div>
          </div>
          
          {/* This empty div helps with centering on larger screens */}
          <div className="hidden sm:block sm:w-40"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;