import React from 'react'
import AnimatedCursor from '../components/AnimatedCursor'
import Navbar from '../components/Navbar'
const BeatsFree = () => {
  return (
    <div>
      <AnimatedCursor />
      <Navbar/>
      <div className="flex justify-center items-center">
  <div className="tabs tabs-box w-32 mt-4 flex items-center">
    <a href="/beats/free" className="tab tab-active">Free</a>
    <a href="/beats/paid" className="tab">Paid</a>
  </div>
</div>

    </div>
  )
}

export default BeatsFree