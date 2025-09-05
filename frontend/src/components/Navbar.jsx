import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, LogIn } from 'lucide-react';

const Navbar = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Always prefer userProfile.photoURL if available, otherwise fallback to Firebase user
    if (userProfile?.photoURL) {
      setProfilePic(userProfile.photoURL);
    } else if (currentUser?.photoURL) {
      setProfilePic(currentUser.photoURL);
    } else {
      setProfilePic(null);
    }
  }, [userProfile, currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageError = () => {
    console.warn('Profile image failed to load, falling back to initials.');
    setProfilePic(null);
  };

  return (
    <div className="max-w-screen-xl mx-auto navbar sticky py-0 backdrop-blur-md shadow-lg border-b border-white/10 top-0 z-50">
      {/* Left section with logo + mobile menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-1"
          >
            <li><a href="/#about">About</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/beats">Market</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/#contact">Contact</a></li>
            {!currentUser ? (
              <li><a href="/login">Login</a></li>
            ) : (
              <>
                <li><a href="/profile">Profile</a></li>
                <li><a href="/collections">Collections</a></li>
                <li><button onClick={handleLogout} className="text-left">Logout</button></li>
              </>
            )}
          </ul>
        </div>
        <a href="/"><img className="h-15 w-15" src={logo} alt="logo" /></a>
      </div>

      {/* Right section with nav links and avatar */}
      <div className="navbar-end hidden lg:flex items-center">
        <ul className="menu menu-horizontal">
          <li className="px-1"><a href="/#about">About</a></li>
          <li className="px-1"><a href="/#services">Services</a></li>
          <li className="px-1"><a href="/beats">Market</a></li>
          <li className="px-1"><a href="/gallery">Gallery</a></li>
          <li className="px-1"><a href="/#contact">Contact</a></li>
          {currentUser && <li className="px-1"><a href="/collections">Collections</a></li>}
        </ul>

        {!currentUser ? (
          <a href="/login" className="btn btn-ghost p-2 w-10 h-10"><LogIn/></a>
        ) : (
          <div className="dropdown dropdown-end ml-4">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">
                  {(userProfile?.name || currentUser?.displayName || currentUser?.email || 'U')[0].toUpperCase()}
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 gap-2 shadow"
            >
              <li>
                <a href="/profile" className="flex items-center gap-2">
                  <User size={16} />
                  Profile
                </a>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
