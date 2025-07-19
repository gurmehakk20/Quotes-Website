import React from 'react';
import QuoteCard from '../Components/QuoteCard';
import SpecialTip from '../Components/SpecialTip';
import MoodFilter from '../Components/MoodFilter';
import Footer from '../Components/Footer';
import '../Styles/Home.css';

const Home = () => {
  const todaysQuote = {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  };

  const todaysTip = "Take a moment today to practice gratitude. Write down three things you're thankful for and notice how this simple practice can shift your perspective and mood.";

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
          
        </div>
      </section>

      {/* Quote of the Day */}
      <section className="section">
        <h2 className="section-title">Quote of the Day</h2>
        <QuoteCard 
          text={todaysQuote.text}
          author={todaysQuote.author}
        />
      </section>

      {/* Mood Filter */}
      <section className="section narrow">
        <MoodFilter />
      </section>

      {/* Special About Today */}
      <section className="section narrow">
        <SpecialTip tip={todaysTip} />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
