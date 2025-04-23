import React, { useState, useRef } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dialogRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setShowConfirmation(false);
    }
  };

  React.useEffect(() => {
    if (showConfirmation) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showConfirmation]);

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    navigate('/signup');
    setShowConfirmation(false);
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <footer className="bg-black/90 text-white py-12 px-4 border-t border-red-900/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left-aligned account button */}
        <div className="md:order-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isAuthenticated ? handleLogout : handleSignupRedirect}
            className={`px-4 py-2 rounded-full border ${
              isAuthenticated 
                ? 'border-red-600 text-red-500 hover:bg-red-900/20'
                : 'border-green-600 text-green-500 hover:bg-green-900/20'
            } transition-all duration-300`}
          >
            {isAuthenticated ? 'Log Out' : 'Create Account'}
          </motion.button>
        </div>

        {/* Branding */}
        <div className="md:order-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            ESTADIO
          </h3>
          <p className="mt-2 text-gray-400">Football's digital stadium</p>
        </div>
        
        {/* Social Links */}
        <div className="flex gap-4 md:order-3">
          <motion.a 
            whileHover={{ y: -2, color: '#E1306C' }}
            href="#" 
            className="text-2xl text-gray-400 transition-colors"
          >
            <FaInstagram />
          </motion.a>
          <motion.a 
            whileHover={{ y: -2, color: '#1DA1F2' }}
            href="#" 
            className="text-2xl text-gray-400 transition-colors"
          >
            <FaTwitter />
          </motion.a>
          <motion.a 
            whileHover={{ y: -2, color: '#FF0000' }}
            href="#" 
            className="text-2xl text-gray-400 transition-colors"
          >
            <FaYoutube />
          </motion.a>
        </div>
        
        {/* Links */}
        <div className="space-y-2 md:order-4">
          <h4 className="font-bold">Links</h4>
          <motion.a 
            whileHover={{ x: 5 }}
            href="#" 
            className="block text-gray-400 hover:text-white transition-colors"
          >
            About
          </motion.a>
          <motion.a 
            whileHover={{ x: 5 }}
            href="#" 
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Terms
          </motion.a>
          <motion.a 
            whileHover={{ x: 5 }}
            href="#" 
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Privacy
          </motion.a>
        </div>

        {/* Copyright */}
        <div className="md:col-span-4 md:order-5 pt-8 border-t border-gray-800/50">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Estadio. All rights reserved.
          </p>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              ref={dialogRef}
              className="bg-gray-900 p-6 rounded-xl border border-red-900/50 max-w-sm w-full mx-4"
            >
              <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
              <p className="text-gray-300 mb-6">Are you sure you want to sign out?</p>
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg text-white"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmLogout}
                  className="px-4 py-2 bg-red-600 rounded-lg text-white"
                >
                  Log Out
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}