import { useState } from 'react';
import { LogOut, Trash2, Shield, User, Mail, Calendar, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LightRays from '../components/LightRays';
import DeleteAccountModal from '../components/DeleteAccountModal'; // Add this import

const Profile = () => {
  const {
    currentUser,
    userProfile,
    logout,
    linkGoogleAccount,
    canLinkGoogleAccount,
    getLinkedProviders,
    deleteAccount,
    isGoogleUser
  } = useAuth();
  const navigate = useNavigate();

  const [linkSuccess, setLinkSuccess] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteAccount = async (password = null) => {
    setDeleteLoading(true);
    setError('');

    try {
      await deleteAccount(password);
      navigate('/');
    } catch (error) {
      console.error('Delete account error:', error);
      setError(error.message || 'Failed to delete account. Please try again.');
      setDeleteLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setError('');
  };

  const handleLinkGoogle = async () => {
    setLinkLoading(true);
    setError('');

    try {
      await linkGoogleAccount();
      setLinkSuccess(true);
      setTimeout(() => setLinkSuccess(false), 5000);
    } catch (error) {
      console.error('Link Google account error:', error);
      setError(error.message || 'Failed to link Google account. Please try again.');
    } finally {
      setLinkLoading(false);
    }
  };

  // ... rest of the existing functions remain the same ...

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProviderBadgeColor = (provider) => {
    switch (provider) {
      case 'google':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'manual':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'linked':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getProviderDisplayName = (provider) => {
    switch (provider) {
      case 'google':
        return 'Google Account';
      case 'manual':
        return 'Email Account';
      case 'linked':
        return 'Linked Account';
      default:
        return 'Unknown';
    }
  };

  const handleImageError = (e) => {
    console.error('Failed to load image:', e.target.src);
    e.target.style.display = 'none';
  };

  const linkedProviders = getLinkedProviders ? getLinkedProviders() : [];

  // Loading state
  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // SpotlightCard component matching Home theme
  const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.1)" }) => {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="relative z-10 p-6">
          {children}
        </div>
      </div>
    );
  };

  // ShinyText component matching Home theme
  const ShinyText = ({ text, className = "" }) => {
    return (
      <span className={`bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent ${className}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <LightRays/>
      <Navbar/>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        loading={deleteLoading}
        userEmail={currentUser.email}
        isGoogleUser={isGoogleUser()}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {linkSuccess && (
          <div className="mb-6 animate-fade-in-down">
            <SpotlightCard className="border-green-500/30 bg-green-500/10">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={24} />
                <div>
                  <p className="text-green-300 font-medium">Account Successfully Linked!</p>
                  <p className="text-green-400/80 text-sm">Your Google account is now verified and connected.</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 animate-fade-in-down">
            <SpotlightCard className="border-red-500/30 bg-red-500/10">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-red-400" size={24} />
                <div>
                  <p className="text-red-300 font-medium">Error</p>
                  <p className="text-red-400/80 text-sm">{error}</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <SpotlightCard className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <User className="text-purple-400" size={28} />
                  <ShinyText text="Profile Information" />
                </h2>
              </div>

              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-6">
                  <div className="relative group">
                    {userProfile.photoURL ? (
                      <img
                        src={userProfile.photoURL}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white/20 object-cover group-hover:border-white/40 transition-all duration-300"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center border-4 border-white/20 group-hover:border-white/40 transition-all duration-300">
                        <span className="text-white text-2xl font-bold">
                          {(userProfile.name || currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {userProfile.name || currentUser.displayName || 'No name set'}
                    </h3>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getProviderBadgeColor(userProfile.provider)}`}>
                      {getProviderDisplayName(userProfile.provider)}
                    </span>
                  </div>
                </div>

                {/* Connected Accounts - SAME AS BEFORE */}
                {linkedProviders.length > 0 && (
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Shield className="text-green-400" size={20} />
                      <span>Connected Accounts</span>
                    </h4>
                    <div className="space-y-3">
                      {linkedProviders.map((provider, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border border-white/10">
                          {provider.providerId === 'google.com' && (
                            <>
                              <div className="w-8 h-8 bg-red-500 rounded-full text-white text-sm flex items-center justify-center font-bold">G</div>
                              <div className="flex-1">
                                <p className="text-white font-medium">Google Account</p>
                                <p className="text-gray-400 text-sm">{provider.email}</p>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                                Verified
                              </span>
                            </>
                          )}
                          {provider.providerId === 'password' && (
                            <>
                              <div className="w-8 h-8 bg-blue-500 rounded-full text-white text-sm flex items-center justify-center font-bold">@</div>
                              <div className="flex-1">
                                <p className="text-white font-medium">Email Account</p>
                                <p className="text-gray-400 text-sm">{provider.email}</p>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Profile Details Grid - SAME AS BEFORE */}
                <div className="border-t border-white/10 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-400">
                        <Mail size={16} />
                        <span>Email Address</span>
                      </label>
                      <p className="text-white text-lg">{userProfile.email || currentUser.email}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-400">
                        <CheckCircle size={16} />
                        <span>Email Status</span>
                      </label>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${
                        userProfile.emailVerified || userProfile.provider === 'linked' || userProfile.provider === 'google'
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {userProfile.emailVerified || userProfile.provider === 'linked' || userProfile.provider === 'google'
                          ? 'Verified'
                          : 'Not Verified'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-400">
                        <Calendar size={16} />
                        <span>Account Created</span>
                      </label>
                      <p className="text-white">{formatDate(userProfile.createdAt)}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-400">
                        <Calendar size={16} />
                        <span>Last Login</span>
                      </label>
                      <p className="text-white">{formatDate(userProfile.lastLogin)}</p>
                    </div>

                    {userProfile.googleLinkedAt && (
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-400">
                          <Shield size={16} />
                          <span>Google Linked</span>
                        </label>
                        <p className="text-white">{formatDate(userProfile.googleLinkedAt)}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-white/10 pt-6 flex flex-wrap gap-4">
                  {canLinkGoogleAccount && canLinkGoogleAccount() && (
                    <button
                      onClick={handleLinkGoogle}
                      disabled={linkLoading}
                      className="
                        bg-green-500/20 hover:bg-green-500/30
                        text-green-300 hover:text-green-200
                        border border-green-500/30 hover:border-green-500/50
                        px-6 py-2 rounded-lg
                        flex items-center space-x-2
                        transition-all duration-300
                        hover:scale-105 hover:shadow-lg hover:shadow-green-500/20
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      <Shield size={16} />
                      <span>{linkLoading ? 'Linking...' : 'Verify with Google'}</span>
                    </button>
                  )}
                  <button
                    onClick={handleDeleteClick}
                    disabled={deleteLoading}
                    className="
                      bg-red-500/20 hover:bg-red-500/30
                      text-red-300 hover:text-red-200
                      border border-red-500/30 hover:border-red-500/50
                      px-6 py-2 rounded-lg
                      flex items-center space-x-2
                      transition-all duration-300
                      hover:scale-105 hover:shadow-lg hover:shadow-red-500/20
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    <Trash2 size={16} />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <SpotlightCard className="animate-fade-in-up animation-delay-200">
              <div className="text-center">
                <div className="text-4xl mb-4">👋</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Welcome back, {userProfile.name || currentUser.displayName || 'User'}!
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Manage your account settings and view your profile information from this dashboard.
                </p>
              </div>
            </SpotlightCard>

            {/* Account Status */}
            <SpotlightCard className="animate-fade-in-up animation-delay-400">
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Shield className="text-blue-400" size={20} />
                <span>Account Status</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email Verified</span>
                  {userProfile.emailVerified || userProfile.provider === 'linked' || userProfile.provider === 'google' ? (
                    <CheckCircle className="text-green-400" size={18} />
                  ) : (
                    <AlertCircle className="text-yellow-400" size={18} />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Account Type</span>
                  <span className="text-white font-medium">{getProviderDisplayName(userProfile.provider)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Security Level</span>
                  <span className={`font-medium ${
                    userProfile.provider === 'linked' || userProfile.provider === 'google'
                      ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {userProfile.provider === 'linked' || userProfile.provider === 'google' ? 'High' : 'Medium'}
                  </span>
                </div>
              </div>
            </SpotlightCard>

            {/* Quick Actions */}
            {userProfile.provider === 'linked' ? (
              <SpotlightCard className="animate-fade-in-up animation-delay-600 border-green-500/30 bg-green-500/10">
                <div className="text-center">
                  <CheckCircle className="text-green-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-green-300 mb-2">Account Verified</h4>
                  <p className="text-green-400/80 text-sm">
                    Your account is verified and secured with Google authentication.
                  </p>
                </div>
              </SpotlightCard>
            ) : canLinkGoogleAccount && canLinkGoogleAccount() && (
              <SpotlightCard className="animate-fade-in-up animation-delay-600 border-blue-500/30 bg-blue-500/10">
                <div className="text-center">
                  <Shield className="text-blue-400 mx-auto mb-3" size={32} />
                  <h4 className="text-lg font-bold text-blue-300 mb-2">Enhance Security</h4>
                  <p className="text-blue-400/80 text-sm mb-4">
                    Link your Google account to verify your email and improve account security.
                  </p>
                  <button
                    onClick={handleLinkGoogle}
                    disabled={linkLoading}
                    className="
                      w-full bg-blue-500/20 hover:bg-blue-500/30
                      text-blue-300 hover:text-blue-200
                      border border-blue-500/30 hover:border-blue-500/50
                      py-2 px-4 rounded-lg
                      transition-all duration-300
                      hover:scale-105
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    {linkLoading ? 'Linking...' : 'Link Google Account'}
                  </button>
                </div>
              </SpotlightCard>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default Profile;
