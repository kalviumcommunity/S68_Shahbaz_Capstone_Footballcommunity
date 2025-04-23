import { FiSearch, FiUpload, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (isAuthenticated) {
      navigate('/upload');
    } else {
      navigate('/signup', { state: { from: '/upload' } });
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated && user) {
      navigate(`/profile/${user._id}`);
    } else {
      navigate('/signup', { state: { from: '/profile' } });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 bg-black z-50 border-b border-red-900/50 shadow-lg shadow-red-900/10 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent cursor-pointer select-none"
        >
          ESTADIO
        </motion.div>

        {/* Search Bar - Hidden on mobile */}
        <motion.div 
          whileFocus={{ scale: 1.02 }}
          className="hidden md:flex items-center bg-black/50 rounded-full px-4 py-2 flex-1 max-w-md mx-6 border border-red-900/30"
        >
          <FiSearch className="text-red-500/80 mr-2 text-lg" />
          <input 
            type="text" 
            placeholder="Search goals, players, matches..."
            className="bg-transparent border-none outline-none text-white placeholder-red-500/50 w-full focus:placeholder-transparent transition-all duration-300 text-sm"
          />
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Upload Button */}
          <motion.button 
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(220, 38, 38, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-black/50 hover:bg-red-900/20 transition-all duration-300 text-white px-4 py-2 rounded-full border border-red-900/30 group"
          >
            <FiUpload className="text-red-500 group-hover:text-red-400 transition-colors text-lg" />
            <span className="hidden sm:inline text-white group-hover:text-red-300 transition-colors text-sm">
              Upload
            </span>
          </motion.button>

          {/* Profile Button */}
          <motion.button 
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(220, 38, 38, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProfileClick}
            className="flex items-center gap-2 bg-black/50 hover:bg-red-900/20 transition-all duration-300 text-white px-4 py-2 rounded-full border border-red-900/30 group"
          >
            {user?.avatar ? (
              <motion.img 
                whileHover={{ scale: 1.1 }}
                src={user.avatar} 
                alt="Profile" 
                className="w-6 h-6 rounded-full object-cover border border-red-900/50"
              />
            ) : (
              <FiUser className="text-red-500 group-hover:text-red-400 transition-colors text-lg" />
            )}
            <span className="hidden sm:inline text-white group-hover:text-red-300 transition-colors text-sm">
              Profile
            </span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}