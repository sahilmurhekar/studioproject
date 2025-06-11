import React from 'react'

const Contact = () => {
  return (
    <div id='contact' className='flex flex-col px-[5%] md:px-[10%] lg:px-[20%] pt-64 pb-48'>
        <div className='text-8xl md:text-9xl font-black absolute z-1 opacity-5'>CONTACT</div>

        <div className='flex flex-row pt-18 gap-4 relative z-10'>
        <div className='bg-white rounded-full w-5 h-5 mt-2'></div>
        <div className='text-3xl font-black'> <h2>CONNECT WITH ME</h2></div>
        </div>

        <form className='flex flex-col gap-4 relative z-10 pt-16 ' action="" method="post">
        <input type="text" placeholder="Full Name" className="input md:w-150" />
        <input type="email" placeholder="Email" className="input md:w-150" />
        <input type="text" placeholder="Subject" className="input md:w-150" />
        <input type="textarea" placeholder="Message" className="textarea md:w-150" />
        <button type='submit' className='sexybutton rounded-md'>Send →</button>
        </form>
    </div>
  )
}

export default Contact