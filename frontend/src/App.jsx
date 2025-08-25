import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Beats from './pages/Beats'
import Payment from './pages/Payment'

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/gallery' element={<Gallery/>}/>
            <Route path='/beats' element={<Beats/>}/>
            <Route path='/payment' element={<Payment/>}/>
        </Routes>
    </Router>
  )
}

export default App
