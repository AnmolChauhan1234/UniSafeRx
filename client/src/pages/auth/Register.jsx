import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'consumer', // Default role
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(userData);
      // Navigation happens in AuthProvider
    } catch (error) {
      // Error handled in AuthProvider
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { label: 'Admin/Distributor', value: 'admin_dist' },
    { label: 'Wholesaler', value: 'wholesaler' },
    { label: 'Retailer', value: 'retailer' },
    { label: 'Consumer', value: 'consumer' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-6 left-6"
      >
        <Link
          to="/"
          className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-md shadow-md rounded-full border border-gray-200 hover:bg-white transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Back to Home</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl"
      >
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create New Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', type: 'text', name: 'full_name' },
            { label: 'Email Address', type: 'email', name: 'email' },
            { label: 'Phone Number', type: 'tel', name: 'phone_number' },
            { label: 'Password', type: 'password', name: 'password' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                required
                disabled={isLoading}
                className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 ${
                  isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                value={userData[field.name]}
                onChange={(e) => setUserData({ ...userData, [field.name]: e.target.value })}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              disabled={isLoading}
              className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 ${
                isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </span>
            ) : (
              'Register'
            )}
          </Button>
        </form>
        <p className={`text-center text-sm text-gray-600 ${isLoading ? 'opacity-50' : ''}`}>
          Already have an account?{' '}
          <Link
            to="/login"
            className={`text-blue-600 hover:text-blue-800 font-medium ${
              isLoading ? 'pointer-events-none' : ''
            }`}
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}