import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'

import BeatsPaid from './pages/BeatsPaid'
import BeatsFree from './pages/BeatsFree'
import Home from './pages/Home'
import Works from './pages/Works'

function App() {
  return (
    <BrowserRouter>
      <div className="animate-fade-in min-h-screen transition duration-700">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/beats/free" element={<BeatsFree />} />
          <Route path="/beats/paid" element={<BeatsPaid />} />
          <Route path="/works" element={<Works />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
