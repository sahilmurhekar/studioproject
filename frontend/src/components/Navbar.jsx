// src/components/Navbar.jsx
import React from 'react';
import logo from '../assets/logo.png';
import { SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/clerk-react';
import { dark } from '@clerk/themes'

const Navbar = () => {
  return (
    <div className="max-w-screen-xl mx-auto navbar sticky py-0 backdrop-blur-md shadow-lg border-b border-white/10 top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/beats">Market</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/#contact">Contact</a></li>

            {/* Auth links for mobile */}
            <SignedOut>
              <li><a href="/login">Login</a></li>
            </SignedOut>
            <SignedIn>
              <li><UserButton afterSignOutUrl="/" /></li>
            </SignedIn>
          </ul>
        </div>
        <a href="/"><img className="h-15 w-15" src={logo} alt="logo" /></a>
      </div>

      <div className="navbar-end hidden lg:flex items-center">
        <ul className="menu menu-horizontal">
          <li className="px-1"><a href="/">Home</a></li>
          <li className="px-1"><a href="/#about">About</a></li>
          <li className="px-1"><a href="/#services">Services</a></li>
          <li className="px-1"><a href="/beats">Market</a></li>
          <li className="px-1"><a href="/gallery">Gallery</a></li>
          <li className="px-1"><a href="/#contact">Contact</a></li>
        </ul>

        {/* Auth section for desktop */}
        <SignedOut>
        </SignedOut>
        <SignedIn>
          {/* This shows the user’s avatar as a clickable favicon */}
          <SignedIn>
  {/* Avatar that opens Manage Account + Profile in dark mode */}
  <UserButton
  afterSignOutUrl="/"
  appearance={{ baseTheme: dark }}
  userProfileProps={{
    appearance: { baseTheme: dark },
  }}
/>
</SignedIn>

        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
