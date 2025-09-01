import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Beats from './pages/Beats'
import Payment from './pages/Payment'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path='/beats'
          element={
            <ProtectedRoute>
              <Beats/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/payment'
          element={
            <ProtectedRoute>
              <Payment/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
