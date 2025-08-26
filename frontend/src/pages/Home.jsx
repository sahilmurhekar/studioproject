import React from 'react'
import Navbar from '../components/Navbar'
import LightRays from '../components/LightRays'
import BlurText from '../components/BlurText'
import ShinyText from '../components/ShinyText';
import flstudio from '../assets/fl.png'
import Magnet from '../components/Magnet';

const Home = () => {

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
  return (
    <>
    <LightRays/>
    <Navbar/>
    <div className='mt-4 px-[5%] md:px-[10%] flex flex-col justify-center items-center lg:px-0 lg:max-w-screen-xl lg:mx-auto'>
        <div id='hero' className='flex flex-col justify-start items-center my-36'>
           <div className='flex flex-row justify-center items-center text-center bg-base-200 px-4 py-1 my-4 rounded-2xl border border-white/10'>
            <div className='h-2 w-2 bg-green-500 rounded-full mr-2 '></div>
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
            <ShinyText
                text="At Royal Musical Studios, we transform raw inspiration into unforgettable sound. From recording and songwriting to professional beat production and mixing, we provide everything artists need to shape their vision into a masterpiece. Whether you’re a beginner finding your voice or a professional polishing your next hit, this is where your journey begins."
                disabled={false}
                speed={2}
                className='mt-12 text-center lg:w-150'
                />
            <div className='flex flex-row gap-8 mt-12'>
                <a href='#services' className='bg-transparent flex justify-center items-center py-2 px-5 text-sm font-bold text-white border border-white/70 hover:border-white hover:shadow-[0_0_10px_rgba(100,100,100,0.7)] transition duration-300 rounded-md'>Explore More</a>
                <a
                    href='/gallery'
                    className='
                        bg-zinc-200
                        flex justify-center items-center
                        py-2 px-5
                        text-sm font-bold text-black
                        hover:bg-zinc-300
                        hover:shadow-[0_0_10px_rgba(59,130,246,0.7)]
                        rounded-md
                        transition duration-300
                    '
                    >
                    Work Gallery
                    </a>
            </div>
        </div>

        <div id='#about' className='flex flex-col lg:items-start justify-center items-center w-full my-36'>
            <div className='flex flex-row justify-center items-center text-center px-4 py-1 my-4 rounded-2xl border border-white/10'>
            <ShinyText
                text="About"
                disabled={false}
                speed={2}
                className=''
                />
            </div>
            <div className='flex flex-col-reverse lg:flex-row justify-between items-center gap-10 mt-8'>
                <div className='flex flex-col justify-center lg:items-start items-center lg:text-left text-center text-sm md:text-lg lg:w-[60%]'>
                    <ShinyText
                text="Royal Musical Studios is where passion meets professionalism. Built by musicians for musicians, our studio is designed to be a creative sanctuary — a space where ideas flow freely and are transformed into polished masterpieces.
                    We specialize in guiding artists at every stage, from raw inspiration to the final track. With state-of-the-art recording equipment, seasoned producers, and a team that lives and breathes music, we help you create songs that don’t just sound great — they resonate.
                    For us, every project is personal. Every artist has a story, and we make sure that story is told through powerful melodies, compelling lyrics, and unforgettable production."
                disabled={false}
                speed={2}
                className=''
                />
                <a href='/beats' className='mt-8 w-40 bg-transparent flex justify-center items-center py-2 px-5 text-sm font-bold text-white border border-white/70 hover:border-white hover:shadow-[0_0_10px_rgba(100,100,100,0.7)] transition duration-300 rounded-md'>Explore Beats</a>
                </div>
                <div className="flex justify-center lg:justify-end items-center">
                    <Magnet padding={50} disabled={false} magnetStrength={10} className="flex justify-center items-center h-[70%] w-[70%] mt-12 lg:mt-0">
                    <img
                        src={flstudio}
                        alt="flstudio"
                        className='w-full rounded-2xl opacity-30 hover:opacity-80 transition duration-300'
                    />
                    </Magnet>
                </div>
            </div>
        </div>



    </div>
    </>
  )
}

export default Home
