// src/pages/Register.jsx
import {
  SignedIn,
  SignedOut,
  SignUp,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import LightRays from '../components/LightRays';
import AnimatedCursor from '../components/AnimatedCursor';
import ShinyText from '../components/ShinyText';
import SpotlightCard from '../components/SpotlightCard';

export default function Register() {
  return (
    <>
      <AnimatedCursor
        size={8}
        trailSize={40}
        color="rgba(154,115,201,0.95)"
        ease={0.14}
        hoverScale={1.8}
      />
      <LightRays />
      <Navbar />

      <div className="min-h-screen flex flex-col py-24 items-center px-[5%] md:px-[10%] lg:px-0 lg:max-w-screen-xl lg:mx-auto relative z-10">
        {/* If user is signed in, redirect to home */}
        <SignedIn>
          <Navigate to="/" replace />
        </SignedIn>

        {/* If user is signed out, show sign-up */}
        <SignedOut>
          <div className="flex flex-col items-center gap-8 w-full max-w-md">
            {/* Header */}
            <div className='animate-fade-in-down flex flex-row justify-center items-center text-center px-4 py-1 rounded-2xl border border-white/10 bg-base-200 transition-transform duration-300'>
              <ShinyText
                text="Register"
                disabled={false}
                speed={2}
                className=''
              />
            </div>

            {/* Clerk Sign Up Component with fixed dark theme */}
            <div className="flex flex-col items-center gap-8 w-full max-w-md animate-fade-in-up animation-delay-300">
              <SpotlightCard>
                <SignUp
                  path="/register"
                  routing="path"
                  signInUrl="/login"
                  appearance={{
                    baseTheme: 'simple',
                    variables: {
                      colorPrimary: '#3b82f6',
                      colorBackground: '#0',
                      colorInputBackground: '#2a2a2a',
                      colorInputText: '#ffffff',
                      colorText: '#ffffff',
                      colorTextSecondary: '#a1a1aa',
                    },
                    elements: {
                      formButtonPrimary: {
                        backgroundColor: '#333333',
                        border: 'none',
                        color: '#ffffff',
                        fontWeight: '500',
                        '&:hover': {
                          backgroundColor: '#2563eb',
                          transform: 'scale(1.02)',
                        },
                        '&:focus': {
                          outline: 'none',
                          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
                        },
                        transition: 'all 0.3s ease',
                      },
                      card: {
                        backgroundColor: '#0',
                      },
                      socialButtonsBlockButton: {
                        backgroundColor: '#2a2a2a',
                        color: '#ffffff',
                        '&:hover': {
                          backgroundColor: '#333333',
                          transform: 'scale(1.02)',
                        },
                        transition: 'all 0.3s ease',
                      },
                      formFieldInput: {
                        backgroundColor: '#2a2a2a',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        '&:focus': {
                          backgroundColor: '#333333',
                          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
                        },
                        '&::placeholder': {
                          color: '#71717a',
                        },
                        transition: 'all 0.3s ease',
                      },
                      formFieldLabel: {
                        color: '#ffffff',
                        fontWeight: '500',
                      },
                      identityPreviewText: {
                        color: '#ffffff',
                      },
                      identityPreviewEditButton: {
                        color: '#3b82f6',
                      },
                      formHeaderTitle: {
                        color: '#ffffff',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                      },
                      formHeaderSubtitle: {
                        color: '#a1a1aa',
                      },
                      otpCodeFieldInput: {
                        backgroundColor: '#2a2a2a',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        '&:focus': {
                          backgroundColor: '#333333',
                          borderColor: '#3b82f6',
                          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
                        },
                      },
                      footerActionLink: {
                        color: '#3b82f6',
                        '&:hover': {
                          color: '#2563eb',
                        },
                      },
                      dividerLine: {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      dividerText: {
                        color: '#71717a',
                      },
                      alternativeMethodsBlockButton: {
                        backgroundColor: '#2a2a2a',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          backgroundColor: '#333333',
                        },
                      },
                    }
                  }}
                />
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
        </SignedOut>
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
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </>
  );
}
