import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import SpotlightCard from './SpotlightCard';

const LegalNav = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
      if (isOpen) {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }
    }, [isOpen]);

    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalContent = (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        <SpotlightCard>
        <div
          className=" w-full max-w-md max-h-[85vh] rounded-xl flex flex-col overflow-hidden"
          style={{
            maxWidth: '28rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-700 flex-shrink-0">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-800"
              style={{ minWidth: '32px', minHeight: '32px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-6" style={{ maxHeight: 'calc(85vh - 180px)' }}>
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              {children}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 p-4 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full bg-white/80 hover:hover:shadow-[0_0_10px_rgba(237,5,2370.8)] transition duration-300 text-black font-medium py-2.5 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
        </SpotlightCard>
      </div>
    );

    // Use React Portal to render modal at document body level
    return createPortal(modalContent, document.body);
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Terms Link */}
      <button
        onClick={() => setIsTermsOpen(true)}
        className="text-left text-sm text-gray-300 hover:text-blue-400 hover:underline transition-colors"
      >
        Terms of use
      </button>

      {/* Privacy Link */}
      <button
        onClick={() => setIsPrivacyOpen(true)}
        className="text-left text-sm text-gray-300 hover:text-blue-400 hover:underline transition-colors"
      >
        Privacy policy
      </button>

      {/* Terms Modal */}
      <Modal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms & Conditions"
      >
        <p>
          <strong>Use of Services:</strong> You must be 18+ (or the age of majority in your region) and agree to use our services lawfully.
        </p>
        <p>
          <strong>Intellectual Property:</strong> All site content, music, and materials belong to <em>Royal Musical Studios</em> or its licensors. Unauthorized use is prohibited.
        </p>
        <p>
          <strong>User Content:</strong> By submitting content, you grant us rights to use it for service purposes and confirm you own or have rights to it.
        </p>
        <p>
          <strong>Payments & Refunds:</strong> Fees must be paid in full. Refunds are not entertained.
        </p>
        <p>
          <strong>Liability:</strong> We are not liable for indirect or incidental damages. Our liability is limited to the amount you paid us.
        </p>
        <p>
          <strong>Termination:</strong> We may suspend or terminate services if these Terms are violated.
        </p>
        <p>
          <strong>Governing Law:</strong> These Terms are governed by the laws of India.
        </p>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <p>
          <strong>Information We Collect:</strong> We may collect your name, email, payment details, and usage data to provide and improve our services.
        </p>
        <p>
          <strong>Use of Information:</strong> Data is used for service delivery, transactions, communication, and legal compliance.
        </p>
        <p>
          <strong>Sharing:</strong> We do not sell your data. We may share it with service providers or legal authorities when necessary.
        </p>
        <p>
          <strong>Security:</strong> We implement safeguards, but no system is 100% secure.
        </p>
        <p>
          <strong>Your Rights:</strong> You may access, update, or request deletion of your data by contacting us at{' '}
          <a
            href="mailto:royalmusicalstudios@gmail.com"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            royalmusicalstudios@gmail.com
          </a>.
        </p>
        <p>
          <strong>Children:</strong> Our services are not directed to users under 13.
        </p>
        <p>
          <strong>Updates:</strong> We may revise this policy, and changes will be posted on this page.
        </p>
      </Modal>
    </div>
  );
};

export default LegalNav;
