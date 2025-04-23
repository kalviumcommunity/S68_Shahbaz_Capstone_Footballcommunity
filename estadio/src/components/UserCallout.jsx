import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';

export default function UserCallout() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });

  const handleUploadClick = () => {
    if (isAuthenticated) {
      navigate('/upload');
    } else {
      setShowAuthOptions(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginCredentials)).unwrap();
      navigate('/upload');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="py-16 px-4 bg-darker">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {isAuthenticated ? 'Ready to share your clips?' : 'Join our football community'}
          </h2>
          <p className="text-gray-300 mb-6">
            Upload your best football moments and join our community of creators.
            Get featured on our platform and reach millions of football fans.
          </p>
          
          <button 
            onClick={handleUploadClick}
            className="cta-button"
          >
            {isAuthenticated ? 'Upload Your Clip' : 'Get Started'}
          </button>

          {showAuthOptions && !isAuthenticated && (
            <div className="mt-6 p-4 bg-dark rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Sign in or create an account</h3>
              
              <form onSubmit={handleLogin} className="mb-4">
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginCredentials.email}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-darker text-white"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginCredentials.password}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-darker text-white"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-black py-2 rounded font-medium"
                >
                  Login
                </button>
              </form>

              <div className="text-center mb-2 text-gray-400">or</div>
              
              <button
                onClick={() => navigate('/signup', { state: { from: '/upload' } })}
                className="w-full bg-secondary text-white py-2 rounded font-medium"
              >
                Create New Account
              </button>
            </div>
          )}
        </div>
        
        <div className="relative">
          <img 
            src={"https://tse4.mm.bing.net/th?id=OIP.9K2YMs0Z8IlC3SDErk8YgAHaEK&pid=Api&P=0&h=180"} 
            alt="User submission example"
            className="rounded-lg shadow-2xl"
          />
          <div className="absolute -top-3 -left-3 bg-primary text-black font-bold px-3 py-1 rounded-full text-sm">
            USER SUBMISSION
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
            <div className="flex justify-between">
              <span>1.2M views</span>
              <span>@FootballFanatic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}