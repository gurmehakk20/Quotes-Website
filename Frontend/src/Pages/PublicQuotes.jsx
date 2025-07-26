import { useEffect, useState } from 'react'
import api from '../Utils/axios' // this should be preconfigured with baseURL
import QuoteCard from '../Components/QuoteCard'
// import '../Styles/PublicFeed.css'

const PublicQuotes = () => {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    const fetchPublicQuotes = async () => {
      try {
        const res = await api.get('/public-quotes') // <-- Call to your backend
        setQuotes(res.data)
      } catch (err) {
        console.error('Error fetching public quotes:', err)
      }
    }

    fetchPublicQuotes()
  }, [])

  return (
    <div className="public-quotes-page">
      <h2>🌍 Explore Public Quotes</h2>
      {quotes.length === 0 ? (
        <p>Loading quotes...</p>
      ) : (
        <div className="quotes-grid">
          {quotes.map((quote, index) => (
            <QuoteCard
              key={quote._id || index}
              _id={quote._id}
              text={quote.text}
              author={quote.author}
              category={quote.category}
              submittedBy="API Ninjas"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PublicQuotes
