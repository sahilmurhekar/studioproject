import React from 'react'
import logo from '../assets/logo.png'

const Socials = () => {
  return (
    <footer className="footer max-w-screen-xl mx-auto sm:footer-horizontal text-base-content p-10 backdrop-blur-md shadow-lg border-t border-white/10">
  <aside>
    <a href='/'><img className='h-20 w-20' src={logo} alt="ogo" /></a>
    <p>
      Royal Musical Studios
      <br />
      Shaping Musical Journeys Since 2020
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">CONNECT WITH US</h6>
    <a href='https://www.instagram.com/royalmusicalstudios' target='_blank' className="link link-hover">Instagram</a>
    <a href='https://www.youtube.com/@royalmusicalstudios' target='_blank' className="link link-hover">Youtube</a>
    <a href='https://wa.me/+919403078323' target='_blank' className="link link-hover">Whatsapp</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a href='#about' className="link link-hover">About us</a>
    <a href='#services' className="link link-hover">Services</a>
    <a href='#whyus' className="link link-hover">Why Us?</a>
    <a href='#contact' className="link link-hover">Contact</a>
    <a href='mailto:royalmusicalstudios@gmail.com' target='_blank' className="link link-hover">Join the team</a>
  </nav>
  <nav>
  <h6 className="footer-title">Legal</h6>
    <a href='/terms_and_conditions' className="link link-hover">Terms & Conditions</a>
    <a href='/refund_policy' className="link link-hover">Refund Policy</a>
    <a href='/privacy_policy' className="link link-hover">Privacy Policy</a>

</nav>

</footer>
  )
}

export default Socials
