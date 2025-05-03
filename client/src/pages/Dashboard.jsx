import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaPills, FaHistory, FaSearch, FaUserCircle, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { isLoggedIn, loading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Redirect if not logged in
  if (!loading && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome, <span className="text-indigo-600">{sessionStorage.getItem('role')}</span>
            </h1>
            <p className="text-gray-600 mt-1">Track and manage your medicine scans</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-3 py-2 bg-white/70 rounded-lg shadow-sm hover:bg-white transition-colors"
              title="Back to Home"
            >
              <FaHome className="text-lg text-gray-700" />
              <span className="hidden md:inline text-sm font-medium">Home</span>
            </Link>
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isLoggingOut 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'bg-white/70 hover:bg-white text-gray-700'
              } transition-colors`}
              title={isLoggingOut ? 'Logging out...' : 'Logout'}
            >
              {isLoggingOut ? (
                <Loader2 className="text-lg animate-spin" />
              ) : (
                <FaSignOutAlt className="text-lg" />
              )}
              <span className="hidden md:inline text-sm font-medium">
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </span>
            </button>
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
              <FaUserCircle className="text-indigo-600 text-3xl" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/verify-medicine">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaSearch className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">New Scan</h3>
                <p className="text-sm text-gray-500">Scan a medicine now</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/dashboard">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaPills className="text-purple-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">My Medicines</h3>
                <p className="text-sm text-gray-500">View saved medicines</p>
              </div>
            </motion.div>
          </Link>

          <Link to="/dashboard">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="p-3 bg-green-100 rounded-lg">
                <FaHistory className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Scan History</h3>
                <p className="text-sm text-gray-500">View past scans</p>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Scan History Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaHistory className="mr-2 text-indigo-600" />
              Recent Scan History
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-6"
          >
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-indigo-400 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No scans yet</h3>
              <p className="text-gray-500 mb-6">Start by scanning your first medicine</p>
              <Link to="/verify-medicine">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
                >
                  Scan Medicine
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}