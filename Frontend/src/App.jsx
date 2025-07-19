import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SubmitQuote from './Pages/SubmitQuote'
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './Pages/Home'
import Login from './Pages/Login'
import AllQuotes from './Pages/AllQuotes'
import PublicQuotes from './Pages/PublicQuotes'

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/quotes" element={<AllQuotes />} /> */}
        
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <SubmitQuote />
            </ProtectedRoute>
          }
        />

        <Route path="/public" element={<PublicQuotes />} />
      </Routes>
  )
}

export default App
