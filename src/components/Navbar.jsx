import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to check if the current path matches the given path
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-white text-2xl font-bold">Appointment</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link 
            to="/" 
            className={`text-white ${isActive('/') ? 'font-bold' : 'hover:text-gray-300'}`}
          >
            Home
          </Link>
          <Link 
            to="/teacher-dashboard" 
            className={`text-white ${isActive('/teacher-dashboard') ? 'font-bold' : 'hover:text-gray-300'}`}
          >
            Teacher Dashboard
          </Link>
          <Link 
            to="/signup" 
            className={`text-white ${isActive('/signup') ? 'font-bold' : 'hover:text-gray-300'}`}
          >
            Sign Up
          </Link>
          <Link 
            to="/login" 
            className={`text-white ${isActive('/login') ? 'font-bold' : 'hover:text-gray-300'}`}
          >
            Login
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-500 p-4 space-y-4`}
      >
        <Link 
          to="/" 
          className={`text-white ${isActive('/') ? 'font-bold' : 'hover:text-gray-300'}`} 
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link 
          to="/teacher-dashboard" 
          className={`text-white ${isActive('/teacher-dashboard') ? 'font-bold' : 'hover:text-gray-300'}`} 
          onClick={toggleMenu}
        >
          Teacher Dashboard
        </Link>
        <Link 
          to="/signup" 
          className={`text-white ${isActive('/signup') ? 'font-bold' : 'hover:text-gray-300'}`} 
          onClick={toggleMenu}
        >
          Sign Up
        </Link>
        <Link 
          to="/login" 
          className={`text-white ${isActive('/login') ? 'font-bold' : 'hover:text-gray-300'}`} 
          onClick={toggleMenu}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
