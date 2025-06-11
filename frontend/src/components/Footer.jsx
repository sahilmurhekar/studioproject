import React from 'react'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>
    <img src="/assets/crown.png" alt="" className='w-15 h-10'/>
    <p>
      Copyright © 2023 Royal Musical Studios
      <br />
      Providing high-quality music production services since 2023
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Follow us</h6>
    <a className="link link-hover">Intagram</a>
    <a className="link link-hover">YouTube</a>
  </nav>
  <nav>
    <h6 className="footer-title">Contact us</h6>
    <a className="link link-hover">sahil.murhekar2004@gmail.com</a>
    <a className="link link-hover">Message</a>

  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
  </nav>
</footer>
  )
}

export default Footer