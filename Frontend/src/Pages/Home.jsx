import React, { useState, useEffect, useContext } from 'react';
import QuoteCard from '../Components/QuoteCard';
import SpecialTip from '../Components/SpecialTip';
import MoodFilter from '../Components/MoodFilter';
import Footer from '../Components/Footer';
import { Search, TrendingUp, Heart, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import api from '../Utils/axios';
import '../Styles/Home.css';

const Home = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [showAllQuotes, setShowAllQuotes] = useState(false);
  const { user } = useContext(AuthContext);

  const categories = [
    'Motivation', 'Love', 'Success', 'Life', 'Happiness', 
    'Wisdom', 'Friendship', 'Courage', 'Hope', 'Inspiration'
  ];

  const moodCategories = {
    'Happy': ['Motivation', 'Happiness', 'Success'],
    'Sad': ['Hope', 'Courage', 'Inspiration'],
    'Calm': ['Wisdom', 'Life', 'Peace'],
    'Overwhelmed': ['Courage', 'Hope', 'Motivation'],
    'Motivated': ['Success', 'Motivation', 'Inspiration']
  };

  // Fetch quotes on component mount
  useEffect(() => {
    fetchQuotes();
  }, []);

  // Filter quotes when search, category, or mood changes
  useEffect(() => {
    let filtered = [...quotes];
    
    if (searchTerm) {
      filtered = filtered.filter(quote => 
        quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(quote => 
        quote.category && quote.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (selectedMood && moodCategories[selectedMood]) {
      const moodCats = moodCategories[selectedMood];
      filtered = filtered.filter(quote => 
        quote.category && moodCats.some(cat => 
          quote.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
    
    setFilteredQuotes(filtered);
  }, [quotes, searchTerm, selectedCategory, selectedMood]);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/public-quotes');
      setQuotes(response.data);
      setFilteredQuotes(response.data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      // Fallback to static quotes if API fails
      setQuotes([
        {
          _id: 'fallback_1',
          text: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          category: "Motivation"
        },
        {
          _id: 'fallback_2',
          text: "Life is what happens when you're busy making other plans.",
          author: "John Lennon",
          category: "Life"
        },
        {
          _id: 'fallback_3',
          text: "The future belongs to those who believe in the beauty of their dreams.",
          author: "Eleanor Roosevelt",
          category: "Inspiration"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setSelectedCategory('');
    setSearchTerm('');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedMood('');
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedMood('');
  };

  const getQuoteOfTheDay = () => {
    if (quotes.length === 0) return null;
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return quotes[dayOfYear % quotes.length];
  };

  const quoteOfTheDay = getQuoteOfTheDay();

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-inner">
          <h1 className="hero-title">
            Discover Your <span className="highlight">Daily Inspiration</span>
          </h1>
          <p className="hero-subtitle">
            Find the perfect quote to match your mood and brighten your day
          </p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search quotes or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Quick Category Pills */}
          <div className="category-pills">
            {categories.slice(0, 6).map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quote of the Day */}
      {quoteOfTheDay && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <Sparkles className="section-icon" size={24} />
              Quote of the Day
            </h2>
            <button onClick={fetchQuotes} className="refresh-btn" title="Get new quotes">
              <RefreshCw size={20} />
            </button>
          </div>
          <QuoteCard 
            text={quoteOfTheDay.text}
            author={quoteOfTheDay.author}
            _id={quoteOfTheDay._id}
          />
        </section>
      )}

      {/* Mood Filter */}
      <section className="section narrow">
        <MoodFilter onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
      </section>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory || selectedMood) && (
        <section className="section narrow">
          <div className="active-filters">
            <h3>Active Filters:</h3>
            <div className="filter-tags">
              {searchTerm && (
                <span className="filter-tag">
                  Search: "{searchTerm}" ×
                  <button onClick={() => setSearchTerm('')}>×</button>
                </span>
              )}
              {selectedCategory && (
                <span className="filter-tag">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('')}>×</button>
                </span>
              )}
              {selectedMood && (
                <span className="filter-tag">
                  Mood: {selectedMood}
                  <button onClick={() => setSelectedMood('')}>×</button>
                </span>
              )}
            </div>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear All Filters
            </button>
          </div>
        </section>
      )}

      {/* Filtered Quotes */}
      {filteredQuotes.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUp className="section-icon" size={24} />
              {searchTerm ? `Search Results (${filteredQuotes.length})` : 
               selectedCategory ? `${selectedCategory} Quotes (${filteredQuotes.length})` :
               selectedMood ? `${selectedMood} Quotes (${filteredQuotes.length})` :
               `All Quotes (${filteredQuotes.length})`}
            </h2>
            {filteredQuotes.length > 3 && (
              <button 
                onClick={() => setShowAllQuotes(!showAllQuotes)}
                className="toggle-quotes-btn"
              >
                {showAllQuotes ? 'Show Less' : `Show All (${filteredQuotes.length})`}
                <ArrowRight className={`arrow-icon ${showAllQuotes ? 'rotated' : ''}`} size={16} />
              </button>
            )}
          </div>
          
          <div className="quotes-grid">
            {(showAllQuotes ? filteredQuotes : filteredQuotes.slice(0, 3)).map((quote, index) => (
              <QuoteCard 
                key={quote._id || index}
                text={quote.text}
                author={quote.author}
                _id={quote._id}
              />
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {!isLoading && filteredQuotes.length === 0 && (searchTerm || selectedCategory || selectedMood) && (
        <section className="section">
          <div className="no-results">
            <Heart className="no-results-icon" size={48} />
            <h3>No quotes found</h3>
            <p>Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="section">
          <div className="loading-container">
            <RefreshCw className="loading-spinner" size={32} />
            <p>Loading inspiring quotes...</p>
          </div>
        </section>
      )}

      {/* Special About Today */}
      <section className="section narrow">
        <SpecialTip />
      </section>

      {/* Call to Action */}
      {user && (
        <section className="section narrow">
          <div className="cta-card">
            <h3>Share Your Wisdom</h3>
            <p>Have an inspiring quote to share? Submit it and inspire others!</p>
            <a href="/submit-quote" className="cta-button">
              Submit a Quote
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;
