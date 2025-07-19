import {useState, useContext} from 'react'
import { AuthContext } from '../Context/AuthContext'
import api from '../Utils/axios'
import { useNavigate } from 'react-router-dom'

const SubmitQuote = () => {
    
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    
    const navigate = useNavigate()

    const { token } = useContext(AuthContext)

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/quotes/submit', { text, author, category })
      setMessage(res.data.msg)
      setText('')
      setAuthor('')
      setCategory('')
      setTimeout(() => navigate('/'), 2000) // go home after success
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to submit")
    }
  }


  return (
    <div className="submit-quote-container">
      <h2>Submit a New Quote</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SubmitQuote
