import React, { useState, useContext, useEffect } from 'react';
import '../Styles/QuoteCard.css'
import { Quote, Bookmark, BookmarkCheck } from 'lucide-react';
import api from '../Utils/axios';
import { AuthContext } from '../Context/AuthContext';

const QuoteCard = ({ text, author, _id }) => {
  const { user, token } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debug: Log authentication status
  console.log('QuoteCard auth status:', { 
    hasUser: !!user, 
    hasToken: !!token, 
    userId: user?.id,
    username: user?.username 
  });

  // Check if quote is already saved when component mounts
  useEffect(() => {
    const checkIfSaved = async () => {
      // Only check if user is logged in and we have a token
      if (user && token && _id) {
        try {
          console.log('Checking if saved for quote:', _id, 'User:', user.username);
          const response = await api.get(`/user/is-saved/${_id}`);
          setIsSaved(response.data.isSaved);
        } catch (error) {
          console.error('Error checking saved status:', error);
          // If we get a 401, the user might not be properly authenticated
          if (error.response?.status === 401) {
            console.log('User not authenticated, skipping save check');
          }
        }
      }
    };

    checkIfSaved();
  }, [user, token, _id]);

  const handleSaveQuote = async () => {
    if (!user || !token) {
      alert('Please login to save quotes');
      return;
    }

    if (!_id) {
      alert('This quote cannot be saved');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Saving quote:', _id, 'User:', user.username);
      // For external quotes, send the quote data in the request body
      const requestData = _id.startsWith('external_') 
        ? { text, author, source: 'external' }
        : {};
      
      await api.post(`/user/save-quote/${_id}`, requestData);
      setIsSaved(true);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'Quote already saved') {
        setIsSaved(true);
      } else {
        console.error('Error saving quote:', error);
        alert('Failed to save quote. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quote-card">
      <div className="quote-header">
        <Quote className="quote-icon" />
        {user && token && _id && (
          <button 
            className={`save-button ${isSaved ? 'saved' : ''}`}
            onClick={handleSaveQuote}
            disabled={isLoading}
            title={isSaved ? 'Quote saved' : 'Save quote'}
          >
            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        )}
      </div>
        
      <blockquote className="quote-text">
        "{text}"
      </blockquote>
      <div className="quote-author">
        — {author}
      </div>
    </div>
  );
};

export default QuoteCard;
