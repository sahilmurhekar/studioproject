import React from 'react'

const About = () => {
  return (
    <div id='about' className='flex flex-col px-[5%] md:px-[10%] lg:px-[25%]'>
        <div className='text-8xl md:text-9xl font-black absolute z-1 opacity-5'>ABOUT</div>
        <div className='flex flex-row pt-16 relative z-10'>
            <div className='border-1 rounded-full border-white border-opacity-50 w-10 h-10 md:flex items-center justify-center hidden '>   
                1
            </div>
            <div className='flex flex-col pl-6'>
            <h1 className='text-3xl font-black'>OUR MISSION</h1>
            <p className='pt-4 w-100'>At Royal Music Studios, we are dedicated to providing a comprehensive platform for musical exploration, education, and creation. Our mission is to empower individuals to unleash their musical potential and bring their creative visions to life.
            </p>
            </div>
        </div>



        <div className='flex flex-row pt-16 md:justify-end relative z-10'>
            <div className='border-1 rounded-full border-white border-opacity-50 w-10 h-10 md:flex items-center justify-center hidden '>   
                2
            </div>
            <div className='flex flex-col pl-6'>
            <h1 className='text-3xl font-black'>EDUCATION</h1>
            <p className='pt-4 w-100 '>Explore our range of courses designed to equip aspiring musicians and producers with the skills and knowledge needed to excel in music production. Whether you're a beginner or an experienced producer, our courses cover everything from the fundamentals to advanced techniques using industry-standard software like FL Studio.
            </p>
            </div>

        </div>



        <div className='flex flex-row pt-16 relative z-10'>
            <div className='border-1 rounded-full border-white border-opacity-50 w-10 h-10 md:flex items-center justify-center hidden '>   
                3
            </div>
            <div className='flex flex-col pl-6'>
            <h1 className='text-3xl font-black'>BEAT MARKET</h1>
            <p className='pt-4 w-100'>Discover a diverse selection of beats in our marketplace, ranging from free options to premium tracks crafted by our talented team. Find the perfect instrumental to complement your style or project, and elevate your sound with professionally produced beats.
            </p>
            </div>
        </div>



        <div className='flex flex-row pt-16 md:justify-end relative z-10'>
            <div className='border-1 rounded-full border-white border-opacity-50 w-10 h-10 md:flex items-center justify-center hidden '>   
                4
            </div>
            <div className='flex flex-col pl-6'>
            <h1 className='text-3xl font-black'>PUBLISHED SONGS</h1>
            <p className='pt-4 w-100 '>Immerse yourself in our catalog of published songs, showcasing the talent and creativity of our community. From captivating melodies to powerful lyrics, each composition reflects the passion and dedication of our artists.
            </p>
            </div>

        </div>




        <div className='flex flex-row pt-16 relative z-10'>
            <div className='border-1 rounded-full border-white border-opacity-50 w-10 h-10 md:flex items-center justify-center hidden '>   
                5
            </div>
            <div className='flex flex-col pl-6'>
            <h1 className='text-3xl font-black'>COLLABORATION</h1>
            <p className='pt-4 w-100'>Join our collaborative community and connect with like-minded individuals to collaborate on musical projects. Whether you're looking for collaborators or seeking to hire skilled professionals, Royal Music Studios provides a platform for creative collaboration and project development.
            </p>
            </div>
        </div>



        <div className='flex flex-row pt-16 md:justify-end relative z-10'>
            <div className='border-1 rounded-full border-white border-opacity-50 w-10 h-10 md:flex items-center justify-center hidden '>   
                6
            </div>
            <div className='flex flex-col pl-6'>
            <h1 className='text-3xl font-black'>CUSTOM SERVICES</h1>
            <p className='pt-4 w-100 '>Experience our personalized music production service, where we work closely with clients to bring their musical ideas to fruition. Whether you're looking to record and produce a song in your own voice or need assistance with lyrics and composition, our team is here to help you realize your vision.
            </p>
            </div>

        </div>

    </div>
  )
}

export default About