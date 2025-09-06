import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import LightRays from '../components/LightRays'
import SpotlightCard from '../components/SpotlightCard'
import ShinyText from '../components/ShinyText'
import Socials from '../components/Socials'

const Gallery = () => {
  const [visibleCards, setVisibleCards] = useState(6)

  // Sample data for 12 cards - replace with your actual data
  const cardData = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    videoUrl: "https://www.youtube.com/embed/LfuzkFOOWTI?si=JqCY1uOhZBZh2Sxs",
    title: `Video Title ${index + 1}`,
    description: "The final touch that makes all the difference. Our mixing and mastering engineers polish your track, balancing every element so it's radio-ready, streaming-optimized, and stage-approved.",
    link: "https://www.youtube.com/watch?v=LfuzkFOOWTI&list=RDLfuzkFOOWTI"
  }))

  const showMoreCards = () => {
    setVisibleCards(prev => Math.min(prev + 3, cardData.length))
  }

  const hasMoreCards = visibleCards < cardData.length

  return (
    <>

      <LightRays/>
      <Navbar/>
      <div className='my-18 px-[5%] md:px-[10%] flex flex-col justify-center items-center lg:px-0 lg:max-w-screen-xl lg:mx-auto'>
        <div className='flex w-35 flex-row justify-center items-center text-center bg-base-200 px-2 py-1 rounded-2xl border border-white/10 hover:scale-105 transition-transform duration-300'>
          <ShinyText
            text="Work Gallery"
            disabled={false}
            speed={2}
            className=''
          />
        </div>

        <div className='flex flex-row justify-center items-center flex-wrap gap-20 mt-16'>
          {cardData.slice(0, visibleCards).map((card) => (
            <SpotlightCard
              key={card.id}
              className="lg:w-90 lg:h-110 lg:flex lg:flex-col lg:justify-center hover:scale-105 transition-all duration-300 transform hover:-translate-y-2"
              spotlightColor="rgba(255, 255, 255, 0.2)"
            >
              <div className='flex justify-center items-center my-4'>
                <iframe
                  src={card.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-48 rounded-lg"
                ></iframe>
              </div>
              <div className="flex items-center mb-3 justify-center lg:justify-start">
                <h2 className="text-xl font-black text-white">{card.title}</h2>
              </div>
              <p className="text-sm leading-relaxed">
                <p className='text-center lg:text-left text-gray-300'>{card.description}</p>
              </p>
              <div className='flex justify-center items-center lg:justify-start my-4'>
                <a
                  href={card.link}
                  target='_blank'
                  rel="noopener noreferrer"
                  className='
                    bg-transparent flex justify-center items-center py-2 px-5 text-sm font-bold text-white border border-white/70 hover:border-white hover:shadow-[0_0_10px_rgba(100,100,100,0.7)] hover:scale-105 transition-all duration-300 rounded-md transform w-30
                  '
                >
                  Link
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {hasMoreCards && (
          <div className='w-full flex justify-center items-center my-16'>
            <button
              onClick={showMoreCards}
              className='bg-zinc-200
                flex justify-center items-center
                py-2 px-5
                text-sm font-bold text-black
                hover:bg-zinc-300
                hover:shadow-[0_0_10px_rgba(237,5,237,0.8)]
                hover:scale-105
                rounded-md
                transition-all duration-300
                transform
                w-30'
            >
              Show More
            </button>
          </div>
        )}
      </div>
      <Socials/>
    </>
  )
}

export default Gallery;
