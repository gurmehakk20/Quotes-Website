import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import SubmitQuote from './Pages/SubmitQuote'
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SpecialDays from './Pages/SpecialDays'
import SavedQuotes from './Pages/SavedQuotes'
// import AllQuotes from './Pages/AllQuotes'
import PublicQuotes from './Pages/PublicQuotes'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public-quotes" element={<PublicQuotes />} />
          <Route path="/special-days" element={<SpecialDays />} />
          <Route path="/saved-quotes" element={<ProtectedRoute><SavedQuotes /></ProtectedRoute>} />
          <Route
            path="/submit-quote"
            element={
              <ProtectedRoute>
                <SubmitQuote />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
