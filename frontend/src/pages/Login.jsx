import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import LightRays from '../components/LightRays';
import ShinyText from '../components/ShinyText';
import SpotlightCard from '../components/SpotlightCard';
import GoogleIcon from '../components/GoogleIcon';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (currentUser) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to sign in: Invalid Credentials');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Google');
    }
    setLoading(false);
  };

  return (
    <>
      <LightRays />
      <Navbar />

      <div className="min-h-screen flex flex-col py-24 items-center px-[5%] md:px-[10%] lg:px-0 lg:max-w-screen-xl lg:mx-auto relative z-10">
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          {/* Header */}
          <div className="animate-fade-in-down flex flex-row justify-center items-center text-center px-4 py-1 rounded-2xl border border-white/10 bg-base-200 hover:scale-105 transition-transform duration-300">
            <ShinyText text="Login" disabled={false} speed={2} className="" />
          </div>

          {/* Login Form */}
          <div className="flex flex-col items-center gap-8 w-full max-w-md animate-fade-in-up animation-delay-300">
            <SpotlightCard className="w-full p-8">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex mb-6 justify-center text-sm">
                  </div>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="mt-3 w-full flex items-center gap-4 justify-center py-3 px-4 border border-white/20 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
                > <GoogleIcon/>
                  {loading ? 'Signing in...' : 'Sign in with Google'}
                </button>
              </div>

              <div className="text-center mt-6">
                <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                  Don't have an account? Sign up
                </Link>
              </div>
            </SpotlightCard>
          </div>

          {/* Back to Home Link */}
          <div className="animate-fade-in-up animation-delay-500">
            <a
              href="/"
              className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
