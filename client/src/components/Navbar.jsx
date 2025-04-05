import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-brand-600">DevConnect</span>
              <span className="ml-1 text-xs bg-brand-100 text-brand-600 px-1 rounded">Lite</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard') 
                      ? 'text-brand-700 bg-brand-50' 
                      : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/developers" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/developers') 
                      ? 'text-brand-700 bg-brand-50' 
                      : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  Developers
                </Link>
                <Link 
                  to="/chat" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/chat') 
                      ? 'text-brand-700 bg-brand-50' 
                      : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  Chat
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-brand-600 hover:bg-brand-50"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-brand-600 text-white hover:bg-brand-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/dashboard')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                }`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/developers"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/developers')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                }`}
                onClick={closeMenu}
              >
                Developers
              </Link>
              <Link
                to="/chat"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/chat')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                }`}
                onClick={closeMenu}
              >
                Chat
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-50 text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-brand-600 hover:bg-brand-50"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium bg-brand-600 text-white hover:bg-brand-700"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
