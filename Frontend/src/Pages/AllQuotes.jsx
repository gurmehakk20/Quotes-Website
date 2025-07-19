import { useEffect, useState } from 'react'
import api from '../Utils/axios'
import QuoteCard from '../Components/QuoteCard'
// import '../Styles/AllQuotes.css'

const AllQuotes = () => {

    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        const fetchQuotes = async () => {
        try {
            const res = await api.get('/quotes')
            setQuotes(res.data)
        } catch (err) {
            console.error('Error fetching quotes:', err)
        }
        }

        fetchQuotes()
    }, [])


  return (
    <div className="quotes-feed">
      <h2 className="page-title">✨ All Quotes</h2>
      {quotes.length === 0 ? (
        <p>No quotes available yet.</p>
      ) : (
        <div className="quotes-grid">
          {quotes.map((quote) => (
            <QuoteCard
              key={quote._id}
              text={quote.text}
              author={quote.author}
              category={quote.category}
            />
          ))}
        </div>
      )}
      
    </div>
  )
}

export default AllQuotes
