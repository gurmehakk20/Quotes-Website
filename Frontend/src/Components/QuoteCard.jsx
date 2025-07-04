import React from 'react';
import '../Styles/QuoteCard.css'
import { Quote } from 'lucide-react';


const QuoteCard = ({ text, author }) => {
  return (
    <div className="quote-card">
      {/* <div className="quote-icon">❝</div> */}
      <Quote className="quote-icon" />
        
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
