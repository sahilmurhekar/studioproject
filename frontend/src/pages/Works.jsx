import React from 'react'
import AnimatedCursor from '../components/AnimatedCursor'
import MusicStudioCard from '../components/MusicCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Works = () => {
  return (
    <>
    <AnimatedCursor/>
    <Navbar/>
    <div className='flex flex-col px-[5%] md:px-[10%] lg:px-[15%] min-h-screen'>
        <div className='text-8xl md:text-9xl font-black absolute z-1 opacity-5'>WORKS</div>
        <div className='flex flex-row flex-wrap justify-center items-center gap-8 relative z-10 py-16'>
        <MusicStudioCard
        className="z-5"
        url={"https://www.youtube.com/watch?v=9unnRai8Dn0"}
        title="Aake Meri Jindagi Mein"
        description="Aake Meri Jindagi Mein is a heartfelt song that captures the essence of love and longing, blending soulful melodies with poignant lyrics to create an emotional musical experience."
        />
        <MusicStudioCard
        className="z-5"
        url={"https://www.youtube.com/watch?v=Ltsma9vkK44"}
        title="Tu Door Hai"
        description="Tu Door Hai is a poignant ballad that explores the themes of distance and yearning, featuring emotive vocals and a captivating melody that resonates with anyone who has experienced separation from a loved one."
        />
        <MusicStudioCard
        className="z-5"
        url={"https://www.youtube.com/watch?v=771LR1CbI6g"}
        title="Jindagi"
        description="Jindagi is an uplifting anthem that celebrates life and its myriad experiences, combining vibrant rhythms with inspiring lyrics to create a song that motivates and energizes listeners."
        />
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Works