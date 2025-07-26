import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import api from '../Utils/axios';
import QuoteCard from '../Components/QuoteCard';
import '../Styles/Home.css';
import { Heart, Bookmark, Loader2 } from 'lucide-react';

const SavedQuotes = () => {
  const { user, token } = useContext(AuthContext);
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && token) {
      fetchSavedQuotes();
    } else {
      setIsLoading(false);
      setError('You must be logged in to view your saved quotes.');
    }
    // eslint-disable-next-line
  }, [user, token]);

  const fetchSavedQuotes = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await api.get('/user/saved-quotes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuotes(res.data.savedQuotes || []);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch saved quotes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            <Bookmark size={24} />
            My Saved Quotes
          </h2>
        </div>
        {isLoading ? (
          <div className="loading-container">
            <Loader2 className="loading-spinner" size={32} />
            <p>Loading your saved quotes...</p>
          </div>
        ) : error ? (
          <div className="no-results">
            <Heart className="no-results-icon" size={48} />
            <h3>{error}</h3>
          </div>
        ) : quotes.length === 0 ? (
          <div className="no-results">
            <Heart className="no-results-icon" size={48} />
            <h3>No saved quotes yet</h3>
            <p>Start saving your favorite quotes to see them here!</p>
          </div>
        ) : (
          <div className="quotes-grid">
            {quotes.map((quote, idx) => (
              <QuoteCard key={quote._id || idx} {...quote} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SavedQuotes; 