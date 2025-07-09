import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(credentials);
      // Navigation happens in AuthProvider
    } catch (error) {
      // Error handled in AuthProvider
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-indigo-100 to-pink-100 flex items-center justify-center px-4">
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
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl"
      >
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to Your Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            { label: 'Email Address', type: 'email', name: 'email' },
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
                className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2 ${
                  isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                value={credentials[field.name]}
                onChange={(e) => setCredentials({ ...credentials, [field.name]: e.target.value })}
              />
            </div>
          ))}
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-all ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        <p className={`text-center text-sm text-gray-600 ${isLoading ? 'opacity-50' : ''}`}>
          Don’t have an account?{' '}
          <Link
            to="/register"
            className={`text-indigo-600 hover:text-pink-600 font-medium ${
              isLoading ? 'pointer-events-none' : ''
            }`}
          >
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}