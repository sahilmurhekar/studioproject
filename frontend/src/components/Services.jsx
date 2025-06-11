import React from 'react'

const Services = () => {
  return (
    <div id='services' className='flex flex-col px-[5%] md:px-[10%] lg:px-[20%] pt-48'>
        <div className='text-8xl md:text-9xl font-black absolute z-1 opacity-5'>I DO...</div>
        <div className='flex flex-row pt-18 relative z-10'>
            <div className='bg-white rounded-full w-3 opacity-30 md:flex items-center mt-2 justify-center hidden '>   </div>
            <div className='flex flex-col pl-6'>
            <h1 className='text-3xl font-black'>MUSIC PRODUCTION</h1>
            <p className='pt-4 md:text-lg'>Experience professional music production and recording services tailored to your needs. Whether you're an aspiring artist looking to record your debut single or a seasoned musician seeking high-quality production, we provide state-of-the-art facilities and expertise to bring your musical vision to life.</p>
            </div>
        </div>

        <div className='flex flex-row md:flex-row-reverse pt-36 relative z-10'>
            <div className='bg-white rounded-full w-3 opacity-30 md:flex items-center mt-2 justify-center hidden '>   </div>
            <div className='flex flex-col pl-6 md:justify-end md:pr-6'>
            <h1 className='text-3xl font-black md:text-right'>CUSTOM BEAT CREATION</h1>
            <p className='pt-4 md:text-right md:text-lg'>Elevate your sound with custom beat creation services. Collaborate with our team of skilled producers to craft personalized instrumentals that perfectly complement your style and enhance your music projects.</p>
            </div>
        </div>

        <div className='flex flex-row pt-36 relative z-10'>
            <div className='bg-white rounded-full w-3 opacity-30 md:flex items-center mt-2 justify-center hidden '>   </div>
            <div className='flex flex-col pl-6'>
            <h1 className='text-3xl font-black'>SONGWRITING AND LYRICS</h1>
            <p className='pt-4 md:text-lg'>Unlock your lyrical potential with our songwriting and lyric composition services. From crafting heartfelt ballads to energetic anthems, our experienced songwriters work closely with you to capture the essence of your message and create compelling lyrics that resonate with your audience.</p>
            </div>
        </div>

        <div className='flex flex-row md:flex-row-reverse pt-36 relative z-10'>
            <div className='bg-white rounded-full w-3 opacity-30 md:flex items-center mt-2 justify-center hidden '>   </div>
            <div className='flex flex-col pl-6 md:justify-end md:pr-6'>
            <h1 className='text-3xl font-black md:text-right'>PERFORMANCE ENHANCEMENT</h1>
            <p className='pt-4 md:text-right md:text-lg'>Refine your vocal skills and stage presence with our vocal coaching and performance enhancement services. Whether you're preparing for a live performance or recording session, our expert coaches provide personalized guidance and techniques to help you deliver your best performance yet.

</p>
            </div>
        </div>

    </div>
  )
}

export default Services