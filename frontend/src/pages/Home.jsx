import React, { useEffect, useRef, useState } from 'react'
import { Mic, Edit3, Music, Headphones, Library, Check, CheckCheck, Mouse, Scroll, Mail, Phone, MapPin, Send } from 'lucide-react'
import Navbar from '../components/Navbar'
import LightRays from '../components/LightRays'
import BlurText from '../components/BlurText'
import ShinyText from '../components/ShinyText';
import flstudio from '../assets/fl.png'
import flstudio2 from '../assets/fl2.png'
import Magnet from '../components/Magnet';
import SpotlightCard from '../components/SpotlightCard';
import Socials from '../components/Socials'
import AnimatedCursor from '../components/AnimatedCursor'

const Home = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const aboutImageRef = useRef(null);
  const serviceCardsRef = useRef(null);
  const contactFormRef = useRef(null);
  const whyUsRef = useRef(null);
  const whyUsImageRef = useRef(null);
  const whyUsContentRef = useRef(null);
  const contactInfoRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'recording'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = [
      aboutRef.current,
      servicesRef.current,
      heroButtonsRef.current,
      aboutImageRef.current,
      serviceCardsRef.current,
      contactFormRef.current,
      whyUsRef.current,
      whyUsImageRef.current,
      whyUsContentRef.current,
      contactInfoRef.current
    ];

    elements.forEach(el => {
      if (el) {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-1000', 'ease-out');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          serviceType: 'recording'
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <AnimatedCursor
        size={8}
        trailSize={40}
        color="rgba(154,115,201,0.95)"
        ease={0.14}
        hoverScale={1.8}
      />
    <LightRays/>
    <Navbar/>
    <div className='px-[5%] md:px-[10%] flex flex-col justify-center items-center lg:px-0 lg:max-w-screen-xl lg:mx-auto'>
        <div id='hero' className='flex flex-col justify-start items-center my-16 mb-0 md:my-28 md:mb-0 lg:mb-0 lg:max-h-screen lg:my-24'>
           <div className='flex flex-row justify-center items-center text-center bg-base-200 px-4 py-1 my-4 rounded-2xl border border-white/10 animate-fade-in-down'>
            <div className='h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse'></div>
            <ShinyText
                text="Royal Musical Studios"
                disabled={false}
                speed={2}
                className='custom-class'
                />
            </div>
            <BlurText
            text="Turning Ideas Into Music, and Music Into Magic."
            delay={200}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl md:text-5xl lg:text-7xl mt-12 lg:w-280 font-black justify-center"
            />
            <div className="animate-fade-in-up animation-delay-500">
              <ShinyText
                  text="At Royal Musical Studios, we transform raw inspiration into unforgettable sound. From recording and songwriting to professional beat production and mixing, we provide everything artists need to shape their vision into a masterpiece. Whether you're a beginner finding your voice or a professional polishing your next hit, this is where your journey begins."
                  disabled={false}
                  speed={2}
                  className='mt-12 text-center lg:w-150'
                  />
            </div>
            <div ref={heroButtonsRef} className='flex flex-row gap-8 mt-12'>
                <a href='#services' className='bg-transparent flex justify-center items-center py-2 px-5 text-sm font-bold text-white border border-white/70 hover:border-white hover:shadow-[0_0_10px_rgba(100,100,100,0.7)] hover:scale-105 transition-all duration-300 rounded-md transform'>Explore More</a>
                <a
                    href='/gallery'
                    className='
                        bg-zinc-200
                        flex justify-center items-center
                        py-2 px-5
                        text-sm font-bold text-black
                        hover:bg-zinc-300
                        hover:shadow-[0_0_10px_rgba(237,5,2370.8)]
                        hover:scale-105
                        rounded-md
                        transition-all duration-300
                        transform
                    '
                    >
                    Work Gallery
                    </a>
            </div>
                <Mouse size={25} className='mt-28 animate-float'/>
        </div>

        <div ref={aboutRef} id='about' className='flex flex-col justify-center items-center w-full py-48 lg:py-48 lg:pb-36 pb-0'>
            <div className='flex flex-row justify-center items-center text-center px-4 py-1 lg:mb-16 rounded-2xl border border-white/10 bg-base-200 hover:scale-105 transition-transform duration-300'>
            <ShinyText
                text="About"
                disabled={false}
                speed={2}
                className=''
                />
            </div>
            <div className='flex flex-col-reverse lg:flex-row justify-between items-center gap-10 mt-8'>
                <div className='flex flex-col justify-center lg:items-start items-center lg:text-left text-center text-sm md:text-lg lg:w-full animate-slide-in-left'>
                    <p>Royal Musical Studios is where passion meets professionalism. Built by musicians for musicians, our studio is designed to be a creative sanctuary — a space where ideas flow freely and are transformed into polished masterpieces.
                    We specialize in guiding artists at every stage, from raw inspiration to the final track. With state-of-the-art recording equipment, seasoned producers, and a team that lives and breathes music, we help you create songs that don't just sound great — they resonate.
                    For us, every project is personal. Every artist has a story, and we make sure that story is told through powerful melodies, compelling lyrics, and unforgettable production.</p>
                <a href='/beats' className='mt-16 w-40 bg-transparent flex justify-center items-center py-2 px-5 text-sm font-bold text-white border border-white/70 hover:border-white hover:shadow-[0_0_10px_rgba(100,100,100,0.7)] hover:scale-105 transition-all duration-300 rounded-md transform'>Explore Beats</a>
                </div>
                <div ref={aboutImageRef} className="flex justify-center lg:justify-end items-center">
                    <Magnet padding={50} disabled={false} magnetStrength={10} className="flex justify-center items-center h-[70%] w-[70%] mt-12 lg:mt-0 hover:rotate-2 transition-transform duration-500">
                    <img
                        src={flstudio}
                        alt="flstudio"
                        className='w-full rounded-2xl opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 transform'
                    />
                    </Magnet>
                </div>
            </div>
        </div>
        <div ref={servicesRef} id='services' className='py-32 lg:py-28 pb-0'>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex w-25 flex-row justify-center items-center text-center bg-base-200 px-4 py-1 my-4 rounded-2xl border border-white/10 hover:scale-105 transition-transform duration-300'>
            <ShinyText
                text="Services"
                disabled={false}
                speed={2}
                className=''
                />
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <ShinyText
                  text="At Royal Musical Studios, we offer a complete music creation ecosystem under one roof. Here's how we help artists, creators, and businesses bring their ideas to life"
                  disabled={false}
                  speed={2}
                  className='text-center text-lg px-[5%] my-7 lg:w-240'
                  />
            </div>
            </div>
            <div ref={serviceCardsRef} className='my-8 flex flex-row flex-wrap justify-center items-center gap-10 lg:gap-20'>
                <div className="animate-float animation-delay-100">
                  <SpotlightCard className="lg:w-80 lg:h-90 lg:flex lg:flex-col lg:justify-center hover:scale-105 transition-all duration-300 transform hover:-translate-y-2" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex items-center mb-3 justify-center lg:justify-start">
                        <Mic className="text-blue-400 mr-3" size={28} />
                        <h2 className="text-2xl font-bold">Song Recording</h2>
                      </div>
                      <p className="text-lg leading-relaxed">
                          <p className='text-center lg:text-left'> Experience professional-grade recording with pristine sound quality. Whether you're laying down vocals, instruments, or full tracks, our studio captures every detail with clarity and depth. </p>
                      </p>
                      </SpotlightCard>
                </div>
                <div className="animate-float animation-delay-200">
                  <SpotlightCard className="lg:w-80 lg:h-90 lg:flex lg:flex-col lg:justify-center hover:scale-105 transition-all duration-300 transform hover:-translate-y-2" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex items-center mb-3 justify-center lg:justify-start">
                        <Edit3 className="text-green-400 mr-3" size={28} />
                        <h2 className="text-2xl font-bold">Songwriting & Lyric Assistance</h2>
                      </div>
                      <p className="text-lg leading-relaxed">
                        <p  className='text-center lg:text-left'>Words can be tricky — but we make them sing. Our team helps craft original lyrics and melodies tailored to your voice, message, and audience, ensuring your music feels authentic and powerful.</p>
                      </p>
                      </SpotlightCard>
                </div>
                <div className="animate-float animation-delay-300">
                  <SpotlightCard className="lg:w-80 lg:h-90 lg:flex lg:flex-col lg:justify-center hover:scale-105 transition-all duration-300 transform hover:-translate-y-2" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex items-center mb-3 justify-center lg:justify-start">
                        <Music className="text-purple-400 mr-3" size={28} />
                        <h2 className="text-2xl font-bold">Music Composition</h2>
                      </div>
                      <p className="text-lg leading-relaxed">
                        <p  className='text-center lg:text-left'>Need a unique tune or a score that stands out? From cinematic themes and soulful ballads to energetic EDM drops, we compose music across genres, giving your project a distinct identity.</p>
                      </p>
                      </SpotlightCard>
                </div>
                <div className="animate-float animation-delay-400">
                  <SpotlightCard className="lg:w-80 lg:h-90 lg:flex lg:flex-col lg:justify-center hover:scale-105 transition-all duration-300 transform hover:-translate-y-2" spotlightColor="rgba(255, 255, 255, 0.2)">
                      <div className="flex items-center mb-3 justify-center lg:justify-start">
                        <Headphones className="text-orange-400 mr-3" size={28} />
                        <h2 className="text-2xl font-bold">Mixing & Mastering</h2>
                      </div>
                      <p className="text-lg leading-relaxed">
                        <p className='text-center lg:text-left'>The final touch that makes all the difference. Our mixing and mastering engineers polish your track, balancing every element so it's radio-ready, streaming-optimized, and stage-approved.</p>
                      </p>
                      </SpotlightCard>
                </div>
                <div className="animate-float animation-delay-500">
                  <SpotlightCard className="lg:w-80 lg:h-90 lg:flex lg:flex-col lg:justify-center hover:scale-105 transition-all duration-300 transform hover:-translate-y-2" spotlightColor="rgba(255, 255, 255, 0.2)">
                          <div className="flex items-center mb-3 justify-center lg:justify-start">
                            <Library className="text-pink-400 mr-3" size={28} />
                            <h2 className="text-2xl font-bold">Pre-Made Beats Library</h2>
                          </div>
                          <p className="text-lg leading-relaxed">
                            <p className='text-center lg:text-left'>Sometimes, only something original will do. We design custom beats and instrumentals built exclusively for you, ensuring your sound is one of a kind.</p>
                          </p>
                        </SpotlightCard>
                </div>
            </div>
            <div ref={heroButtonsRef} className='flex flex-row flex-wrap gap-8 mt-24 lg:my-24 justify-center items-center'>
                <a href='/beats' className='bg-transparent flex justify-center items-center py-2 px-5 text-sm font-bold text-white border border-white/70 hover:border-white hover:shadow-[0_0_10px_rgba(100,100,100,0.7)] hover:scale-105 transition-all duration-300 rounded-md transform'>Beat Market</a>
                <a
                    href='#contact'
                    className='
                        bg-zinc-200
                        flex justify-center items-center
                        py-2 px-5
                        text-sm font-bold text-black
                        hover:bg-zinc-300
                       hover:shadow-[0_0_10px_rgba(237,5,2370.8)]
                        hover:scale-105
                        rounded-md
                        transition-all duration-300
                        transform
                    '
                    >
                    Connect with Us!
                    </a>
            </div>
        </div>

        <div ref={whyUsRef} id='whyus' className='flex flex-col justify-center items-center w-full lg:pt-0 py-24 gap-8 lg:gap-24'>
            <div className='flex w-25 flex-row justify-center items-center text-center bg-base-200 px-4 py-1 my-4 rounded-2xl border border-white/10 hover:scale-105 transition-transform duration-300'>
            <ShinyText
                text="Why Us?"
                disabled={false}
                speed={2}
                className=''
                />
            </div>
            <div className='flex flex-col lg:flex-row lg:gap-36 items-center gap-16'>
                <div ref={whyUsImageRef} className="animate-slide-in-left flex justify-center">
                  <Magnet padding={50} disabled={false} magnetStrength={10} className="flex justify-center items-center h-[70%] w-[70%] mt-12 lg:mt-0 hover:rotate-2 transition-transform duration-500">
                      <img
                          src={flstudio2}
                          alt="flstudio"
                          className='w-full rounded-2xl opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 transform'
                      />
                      </Magnet>
                </div>
                <div ref={whyUsContentRef} className='flex flex-col justify-center items-start text-left text-lg gap-6 animate-slide-in-right'>
                    <div className='animate-fade-in-up animation-delay-100'>
                      <h1 className='flex flex-row items-start'><CheckCheck size={25} className='mr-4 mt-1 flex-shrink-0 text-green-400'/><p><span className='font-black'>End-to-End Services: </span>From idea to final master, we handle every step.</p></h1>
                    </div>
                    <div className='animate-fade-in-up animation-delay-200'>
                      <h1 className='flex flex-row items-start'><CheckCheck size={25} className='mr-4 mt-1 flex-shrink-0 text-green-400'/><p><span className='font-black'>Professional Quality: </span>World-class equipment, experienced engineers, and proven expertise.</p></h1>
                    </div>
                    <div className='animate-fade-in-up animation-delay-300'>
                      <h1 className='flex flex-row items-start'><CheckCheck size={25} className='mr-4 mt-1 flex-shrink-0 text-green-400'/><p><span className='font-black'>Creative Collaboration: </span>We treat every artist as a partner in the process.</p></h1>
                    </div>
                    <div className='animate-fade-in-up animation-delay-400'>
                      <h1 className='flex flex-row items-start'><CheckCheck size={25} className='mr-4 mt-1 flex-shrink-0 text-green-400'/><p><span className='font-black'>Fast Turnaround: </span>High-quality results without unnecessary delays.</p></h1>
                    </div>
                    <div className='animate-fade-in-up animation-delay-500'>
                      <h1 className='flex flex-row items-start'><CheckCheck size={25} className='mr-4 mt-1 flex-shrink-0 text-green-400'/><p><span className='font-black'>Global Reach: </span>Our beats and services are available to musicians worldwide.</p></h1>
                    </div>
                </div>
            </div>
        </div>

        <div id='contact' className='flex flex-col justify-center items-center w-full lg:py-18 gap-8 mb-16'>
            <div className='flex w-25 flex-row justify-center items-center text-center bg-base-200 px-4 py-1 rounded-2xl border border-white/10 hover:scale-105 transition-transform duration-300'>
            <ShinyText
                text="Contact"
                disabled={false}
                speed={2}
                className=''
                />
            </div>
            <div className="animate-fade-in-up animation-delay-300">
              <ShinyText
                  text="Your music deserves the right home. Whether you need a recording session, a custom beat, or full production, we're here to make it happen."
                  disabled={false}
                  speed={2}
                  className='text-center text-lg px-[5%] my-7 lg:w-240'
                  />
            </div>

            {/* Enhanced Contact Form */}
            <div ref={contactFormRef} className='w-full max-w-2xl'>
              <SpotlightCard className="p-8" spotlightColor="rgba(255, 255, 255, 0.1)">
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Your Name *'
                        required
                        className='
                            bg-base-200
                            text-white
                            placeholder-white/50
                            border border-white/20
                            rounded-md
                            py-3 px-4
                            focus:outline-none
                            focus:border-blue-400/70
                            focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                            transition-all duration-300
                            text-sm
                        '
                    />
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Your Email *'
                        required
                        className='
                            bg-base-200
                            text-white
                            placeholder-white/50
                            border border-white/20
                            rounded-md
                            py-3 px-4
                            focus:outline-none
                            focus:border-blue-400/70
                            focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                            transition-all duration-300
                            text-sm
                        '
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <input
                        type='tel'
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Your Phone Number'
                        className='
                            bg-base-200
                            text-white
                            placeholder-white/50
                            border border-white/20
                            rounded-md
                            py-3 px-4
                            focus:outline-none
                            focus:border-blue-400/70
                            focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                            transition-all duration-300
                            text-sm
                        '
                    />
                    <select
                        name='serviceType'
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className='
                            bg-base-200
                            text-white
                            border border-white/20
                            rounded-md
                            py-3 px-4
                            focus:outline-none
                            focus:border-blue-400/70
                            focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                            transition-all duration-300
                            text-sm
                        '
                    >
                        <option value='recording'>Song Recording</option>
                        <option value='songwriting'>Songwriting & Lyrics</option>
                        <option value='composition'>Music Composition</option>
                        <option value='mixing'>Mixing & Mastering</option>
                        <option value='beats'>Custom Beats</option>
                        <option value='other'>Other</option>
                    </select>
                  </div>

                  <input
                      type='text'
                      name='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder='Subject *'
                      required
                      className='
                          bg-base-200
                          text-white
                          placeholder-white/50
                          border border-white/20
                          rounded-md
                          py-3 px-4
                          focus:outline-none
                          focus:border-blue-400/70
                          focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                          transition-all duration-300
                          text-sm
                      '
                  />

                  <textarea
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder='Your Message *'
                      required
                      rows={6}
                      className='
                          bg-base-200
                          text-white
                          placeholder-white/50
                          border border-white/20
                          rounded-md
                          py-3 px-4
                          focus:outline-none
                          focus:border-blue-400/70
                          focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]
                          transition-all duration-300
                          text-sm
                          resize-none
                      '
                  ></textarea>
                <div className='flex justify-center'>
                  <button
                      type='submit'
                      disabled={isSubmitting}
                      className='
                        w-90
                        h-12
                          bg-gradient-to-r from-zinc-100 to-zinc-500
                          text-black
                          font-bold
                          py-4 px-8
                          rounded-md
                          hover:shadow-[0_0_10px_rgba(237,5,2370.8)]
                          transition-all duration-300
                          transform
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          disabled:hover:scale-100
                          flex items-center justify-center gap-2
                          cursor-pointer
                      '
                  >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                  </button>
                  </div>
                </form>
              </SpotlightCard>
            </div>
        </div>
    </div>
        <Socials/>

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

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
          transform: translate3d(0,0,0);
        }
        40%, 43% {
          transform: translate3d(0, -30px, 0);
        }
        70% {
          transform: translate3d(0, -15px, 0);
        }
        90% {
          transform: translate3d(0, -4px, 0);
        }
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 1s ease-out forwards;
      }

      .animate-fade-in-down {
        animation: fadeInDown 1s ease-out forwards;
      }

      .animate-slide-in-left {
        animation: slideInLeft 1s ease-out forwards;
      }

      .animate-slide-in-right {
        animation: slideInRight 1s ease-out forwards;
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .animate-bounce {
        animation: bounce 1s infinite;
      }

      .animate-spin {
        animation: spin 1s linear infinite;
      }

      .animation-delay-100 {
        animation-delay: 0.1s;
      }

      .animation-delay-200 {
        animation-delay: 0.2s;
      }

      .animation-delay-300 {
        animation-delay: 0.3s;
      }

      .animation-delay-400 {
        animation-delay: 0.4s;
      }

      .animation-delay-500 {
        animation-delay: 0.5s;
      }

      .animation-delay-600 {
        animation-delay: 0.6s;
      }

      .animation-delay-700 {
        animation-delay: 0.7s;
      }

      .animation-delay-800 {
        animation-delay: 0.8s;
      }

      .animation-delay-900 {
        animation-delay: 0.9s;
      }

      .animation-delay-1000 {
        animation-delay: 1s;
      }

      /* Additional smooth scroll behavior */
      html {
        scroll-behavior: smooth;
      }

      /* Custom scrollbar for better UX */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }

      /* Firefox scrollbar */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
      }

      /* Hover effects for interactive elements */
      .hover-glow:hover {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        transition: all 0.3s ease;
      }

      .hover-scale:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
      }

      .hover-rotate:hover {
        transform: rotate(2deg);
        transition: transform 0.5s ease;
      }

      /* Loading spinner animation */
      .spinner {
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 2px solid #ffffff;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
      }

      /* Gradient text effect */
      .gradient-text {
        background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
        background-size: 300% 300%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradientShift 3s ease infinite;
      }

      @keyframes gradientShift {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }

      /* Subtle parallax effect */
      .parallax-element {
        transform: translateZ(0);
        transition: transform 0.3s ease-out;
      }

      /* Enhanced button hover states */
      .enhanced-button {
        position: relative;
        overflow: hidden;
      }

      .enhanced-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .enhanced-button:hover::before {
        left: 100%;
      }

      /* Smooth transitions for all interactive elements */
      .smooth-transition {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Focus states for accessibility */
      .focus-visible:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }

      /* Card hover effects */
      .card-hover:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        transition: all 0.3s ease;
      }

      /* Text selection styling */
      ::selection {
        background-color: rgba(59, 130, 246, 0.3);
        color: white;
      }

      ::-moz-selection {
        background-color: rgba(59, 130, 246, 0.3);
        color: white;
      }
    `}</style>
    </>
  )
}

export default Home
