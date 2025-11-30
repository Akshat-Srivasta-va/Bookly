import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LandinPage from './pages/LandinPage'
import SignupPage from './pages/SignupPage'


const App = () => {
  return (
    <div>
        <Routes>
            {/* Protected Routes */}
            <Route path="/" element={<LandinPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
        </Routes>
    </div>
  )
}

export default App