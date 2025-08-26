import React from 'react'
import logo from '../assets/logo.png'


const Navbar = () => {
  return (
    <div className="navbar sticky  py-0 px-[5%] md:px-[10%] backdrop-blur-md shadow-lg border-b border-white/10 top-0 z-50">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Home</a></li>
        <li><a>About</a></li>
        <li><a>Services</a></li>
        <li><a>Market</a></li>
        <li><a>Gallery</a></li>
      </ul>
    </div>
    <a href="/"><img className='h-15 w-15' src={logo} alt="logo" /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        <li className='px-1'><a href='/'>Home</a></li>
        <li className='px-1'><a href='/#about'>About</a></li>
        <li className='px-1'><a href='/#services'>Services</a></li>
        <li className='px-1'><a href='/beats'>Market</a></li>
        <li className='px-1'><a href='/gallery'>Gallery</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a href="/#contact" className="bg-zinc-200 py-1 px-3 text-sm font-bold text-black hover:bg-zinc-300 rounded-md">Contact Us</a>
  </div>
</div>
  )
}

export default Navbar
