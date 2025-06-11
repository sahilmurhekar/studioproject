import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 backdrop-blur-md opacity-90 z-20 shadow-sm px-[5%] font-['Kameron'] pt-4 bg-base-100 border-b-1 border-[#E5E7EB]">
  <div className="navbar-start">
    <div className="dropdown">
      <div href='#top' tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a href='/#about'>About</a></li>
        <li><a href='/#services'>Services</a></li>
        <li><a href='/beats/free'>Beats</a></li>
        <li><a href='/works'>Works</a></li>
        <li><a href='/#contact'>Contact</a></li>
      </ul>
    </div>
    <a href="/" className="btn btn-ghost text-md md:text-xl flex md:w-32 h-24 text-left">ROYAL MUSICAL STUDIOS</a>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-4">
        <li><a href='/#about' className='text-md'>About</a></li>
        <li><a href='/#services' className='text-md'>Services</a></li>
        <li><a href='/beats/free' className='text-md'>Beats</a></li>
        <li><a href='/works' className='text-md'>Works</a></li>
        <li><a href='/#contact' className='text-md'>Contact</a></li>
    </ul>
  </div>
</div>
  )
}

export default Navbar
