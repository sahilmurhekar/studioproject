import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Beats from './pages/Beats'
import Payment from './pages/Payment'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Collections from './pages/Collections'
import { AuthProvider } from './contexts/AuthContext'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/terms_and_conditions' element={<TermsAndConditions/>}/>
          <Route path='/privacy_policy' element={<PrivacyPolicy/>}/>
          <Route path='/refund_policy' element={<RefundPolicy/>}/>


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
          <Route
            path='/collections'
            element={
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            }
          />
           <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
