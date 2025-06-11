import React from 'react'

const Hero = () => {
  return (
    <div id='top' className='flex flex-col min-h-screen justify-center items-center'>
    <div className="flex flex-col items-center justify-center">
      <h1 className='text-6xl md:text-9xl lg:px-[30%] font-black text-center text-primary opacity-20 absolute z-1'>SAHIL MURHEKAR</h1>
      <p className='z-10 text-center'> Step into the hallow halls of</p>
      <h1 className='font-black text-center text-4xl z-10 pt-4'>ROYAL MUSICAL STUDIOS</h1>
      <p className='z-10 px-[10%] md:px-[30%] lg:px-[40%] text-center pt-4'>where the air hums with the harmonious symphony of creativity and passion, and every chord, every note, resonates with regal brilliance, inviting you to embark on a journey through the magical realms of melody and rhythm.</p>
      </div>
      <div className='flex justify-center items-center pt-36'> 
        <a href="#about"><img className='pt-4 floating-icon' src="/assets/arrow.png" alt="arrow" /></a>
      </div>
      </div>
  )
}

export default Hero