import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import LightRays from '../components/LightRays';
import ShinyText from '../components/ShinyText';
import SpotlightCard from '../components/SpotlightCard';
import GoogleIcon from '../components/GoogleIcon';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, googleSignIn, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (currentUser) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, formData.name);
      navigate('/');
    } catch (error) {
      setError('Failed to create account: ' + error.message);
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
      setError('Failed to sign in with Google: ' + error.message);
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
          <div className="animate-fade-in-down flex flex-row justify-center items-center text-center px-4 py-1 rounded-2xl border border-white/10 bg-base-200 transition-transform duration-300">
            <ShinyText text="Register" disabled={false} speed={2} className="" />
          </div>

          {/* Register Form */}
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm mt-">
                  </div>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full mt-6 flex items-center gap-4  justify-center py-3 px-4 border border-white/20 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
                ><GoogleIcon/>
                  {loading ? 'Signing up...' : 'Sign up with Google'}
                </button>
              </div>

              <div className="text-center mt-6">
                <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                  Already have an account? Sign in
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

export default Register;
