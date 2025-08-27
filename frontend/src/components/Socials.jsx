import React from 'react'
import logo from '../assets/logo.png'
import Legal from './Legal'

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
    <a href='mailto:sahil.murhekar2004@gmail.com' target='_blank' className="link link-hover">Join the team</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a onClick={()=>document.getElementById('terms_modal').showModal()} className="link link-hover">Terms of use</a>
    <dialog id="terms_modal" className="modal modal-bottom sm:modal-middle backdrop-blur">

  <Legal className="modal-box max-h-[80vh] overflow-y-auto">
    <h3 className="font-bold text-xl mb-4">Terms & Conditions</h3>

    <div className="space-y-3 text-sm leading-relaxed">
      <p><strong>Use of Services:</strong> You must be 18+ (or the age of majority in your region) and agree to use our services lawfully.</p>

      <p><strong>Intellectual Property:</strong> All site content, music, and materials belong to <em>Royal Musical Studios</em> or its licensors. Unauthorized use is prohibited.</p>

      <p><strong>User Content:</strong> By submitting content, you grant us rights to use it for service purposes and confirm you own or have rights to it.</p>

      <p><strong>Payments & Refunds:</strong> Fees must be paid in full. Refunds are not entertained.</p>

      <p><strong>Liability:</strong> We are not liable for indirect or incidental damages. Our liability is limited to the amount you paid us.</p>

      <p><strong>Termination:</strong> We may suspend or terminate services if these Terms are violated.</p>

      <p><strong>Governing Law:</strong> These Terms are governed by the laws of India.</p>
    </div>

    <div className="modal-action flex justify-start">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </Legal>
</dialog>
    <a onClick={()=>document.getElementById('privacy_modal').showModal()} className="link link-hover">Privacy policy</a>
    <dialog id="privacy_modal" className="modal modal-bottom sm:modal-middle backdrop-blur">
  <Legal className="modal-box max-h-[80vh] overflow-y-auto rounded-xl border border-white/30">
    <h3 className="font-bold text-xl mb-4">Privacy Policy</h3>

    <div className="space-y-3 text-sm leading-relaxed">
      <p><strong>Information We Collect:</strong> We may collect your name, email, payment details, and usage data to provide and improve our services.</p>

      <p><strong>Use of Information:</strong> Data is used for service delivery, transactions, communication, and legal compliance.</p>

      <p><strong>Sharing:</strong> We do not sell your data. We may share it with service providers or legal authorities when necessary.</p>

      <p><strong>Security:</strong> We implement safeguards, but no system is 100% secure.</p>

      <p><strong>Your Rights:</strong> You may access, update, or request deletion of your data by contacting us at <a href="mailto:sahil.murhekar2004@gmail.com" className="text-blue-600 underline">sahil.murhekar2004@gmail.com</a>.</p>

      <p><strong>Children:</strong> Our services are not directed to users under 13.</p>

      <p><strong>Updates:</strong> We may revise this policy, and changes will be posted on this page.</p>
    </div>

    <div className="modal-action flex justify-start">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </Legal>
</dialog>
  </nav>
</footer>
  )
}

export default Socials
