import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import Home from './Pages/Home.jsx'
import Explore from './Pages/Explore';
import AddQuote from './Pages/AddQuote';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import QuoteDetail from './Pages/QuoteDetail';
import NotFound from './Pages/Error';


function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/add" element={<AddQuote />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quote/:id" element={<QuoteDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
