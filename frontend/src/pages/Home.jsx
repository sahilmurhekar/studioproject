import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import AnimatedCursor from '../components/AnimatedCursor'

const Home = () => {
  return (
    <>
    <AnimatedCursor />
              <Navbar />
              <Hero />
              <About />
              <Services />
              <Contact />
              <Footer />
            </>
  )
}

export default Home