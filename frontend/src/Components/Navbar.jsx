import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";
import { FiMenu, FiX } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";

function Navbar() {
  const { isLoggedIn, userName, logout } = useContext(UserContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-md z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          CourseFlair
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200 font-medium items-center">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/courses" className="hover:text-blue-600 transition">
            Courses
          </Link>

          {isLoggedIn && (
            <Link to="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl hover:scale-110 transition-transform"
          >
            {darkMode ? <BsSun /> : <BsMoon />}
          </button>

          {!isLoggedIn ? (
            <Link to="/login" className="hover:text-blue-600 transition">
              Login
            </Link>
          ) : (
            <>
              <span className="text-gray-800 dark:text-gray-200 font-semibold">
                Hi, {userName}
              </span>
              <button
                onClick={logout}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 dark:text-gray-200 text-2xl focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 pb-4 flex flex-col space-y-4 text-gray-700 dark:text-gray-200 font-medium shadow-md">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)}>
            Courses
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="text-left"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          {!isLoggedIn ? (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <>
              <span>Hi, {userName}</span>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
