import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { status, error: authError, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = status === 'loading';

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to intended page or default to '/upload'
      navigate(location.state?.from || '/upload');
    }
  }, [isAuthenticated, navigate, location.state]);

  useEffect(() => {
    // Clear error when component unmounts or when authError changes
    return () => setError('');
  }, []);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const resultAction = await dispatch(loginUser(formData));
      // Unwrap the result to properly handle rejected promises
      await resultAction.unwrap();
    } catch (err) {
      // Error is already handled in the authSlice, so we don't need to set it here
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black p-8 rounded-lg border border-gray-800">
        <h2 className="text-2xl font-medium text-white mb-6">Log in to Estadio</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/10 text-red-400 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-900 hover:bg-red-800 text-white py-3 px-4 rounded-md transition-colors disabled:bg-red-900/50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Log in'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            state={location.state}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}