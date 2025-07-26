import React from 'react';
import '../Styles/MoodFilter.css'

const MoodFilter = ({ onMoodSelect, selectedMood }) => {
  const moods = [
    { emoji: '😄', label: 'Happy', colorClass: 'yellow-orange' },
    { emoji: '😢', label: 'Sad', colorClass: 'blue-indigo' },
    { emoji: '😴', label: 'Calm', colorClass: 'purple-pink' },
    { emoji: '🤯', label: 'Overwhelmed', colorClass: 'red-pink' },
    { emoji: '💪', label: 'Motivated', colorClass: 'green-emerald' },
  ];

  return (
    <div className="mood-container">
      <h3 className="mood-title">How are you feeling today?</h3>
      <div className="mood-buttons">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => onMoodSelect && onMoodSelect(mood.label)}
            className={`mood-btn ${mood.colorClass} ${selectedMood === mood.label ? 'selected' : ''}`}
          >
            <div className="emoji">{mood.emoji}</div>
            <div className="label">{mood.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodFilter;
