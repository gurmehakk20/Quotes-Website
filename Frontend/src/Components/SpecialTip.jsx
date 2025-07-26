import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SpecialTip.css';

const SpecialTip = () => {
  const [specialDay, setSpecialDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getSpecialDay();
  }, []);

  const getSpecialDay = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // getMonth() returns 0-11
    const day = today.getDate();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const weekOfMonth = Math.ceil(day / 7);
    
    const specialDays = getSpecialDaysForDate(month, day, dayOfWeek, weekOfMonth);
    
    if (specialDays.length > 0) {
      // Prioritize major events over observances
      const majorEvent = specialDays.find(event => event.type === 'major');
      const observance = specialDays.find(event => event.type === 'observance');
      const weekly = specialDays.find(event => event.type === 'weekly');
      
      const selectedEvent = majorEvent || observance || weekly || specialDays[0];
      setSpecialDay(selectedEvent);
    } else {
      // Fallback to a daily inspiration
      setSpecialDay({
        title: "Daily Inspiration",
        description: "Every day is a new opportunity to grow, learn, and make a positive impact. Take a moment to reflect on what you're grateful for today.",
        type: "daily",
        icon: "🌟"
      });
    }
    
    setIsLoading(false);
  };

  const getSpecialDaysForDate = (month, day, dayOfWeek, weekOfMonth) => {
    const events = [];

    // Major International Events and Holidays
    const majorEvents = {
      "1-1": { title: "New Year's Day", description: "A fresh start, new beginnings, and endless possibilities. What will you create this year?", type: "major", icon: "🎆" },
      "2-14": { title: "Valentine's Day", description: "A day to celebrate love in all its forms - romantic, familial, and friendship. Spread kindness and love today.", type: "major", icon: "💝" },
      "3-8": { title: "International Women's Day", description: "Celebrating the achievements of women and advocating for gender equality worldwide.", type: "major", icon: "👩‍🎓" },
      "3-17": { title: "St. Patrick's Day", description: "A day to celebrate Irish culture and heritage. Wear green and embrace the luck of the Irish!", type: "major", icon: "🍀" },
      "4-1": { title: "April Fools' Day", description: "A day for lighthearted pranks and laughter. Remember to keep it fun and harmless!", type: "major", icon: "🤪" },
      "4-22": { title: "Earth Day", description: "Celebrating our planet and promoting environmental awareness. What can you do to help protect Earth today?", type: "major", icon: "🌍" },
      "5-1": { title: "International Workers' Day", description: "Honoring the contributions of workers worldwide and advocating for labor rights.", type: "major", icon: "👷" },
      "5-5": { title: "Cinco de Mayo", description: "Celebrating Mexican heritage and culture. A day to appreciate diversity and cultural traditions.", type: "major", icon: "🇲🇽" },
      "6-1": { title: "International Children's Day", description: "Celebrating children and promoting their rights, happiness, and well-being worldwide.", type: "major", icon: "👶" },
      "6-21": { title: "International Yoga Day", description: "A day to celebrate the ancient practice of yoga and its benefits for mind, body, and spirit.", type: "major", icon: "🧘" },
      "7-4": { title: "Independence Day (US)", description: "Celebrating freedom and independence. A reminder of the values of liberty and democracy.", type: "major", icon: "🇺🇸" },
      "7-30": { title: "International Friendship Day", description: "Celebrating the beautiful bonds of friendship that enrich our lives and bring us joy.", type: "major", icon: "🤝" },
      "8-12": { title: "International Youth Day", description: "Recognizing the potential of young people and their role in creating positive change.", type: "major", icon: "👨‍🎓" },
      "9-21": { title: "International Day of Peace", description: "A day dedicated to peace and non-violence. Let's work together for a more peaceful world.", type: "major", icon: "🕊️" },
      "10-31": { title: "Halloween", description: "A day of fun, creativity, and imagination. Dress up, be playful, and enjoy the magic of the season!", type: "major", icon: "🎃" },
      "11-11": { title: "Veterans Day", description: "Honoring those who have served in the military and sacrificed for their country.", type: "major", icon: "🎖️" },
      "12-25": { title: "Christmas Day", description: "A time of joy, giving, and celebration. May peace and love fill your heart today.", type: "major", icon: "🎄" },
      "12-31": { title: "New Year's Eve", description: "Reflecting on the year gone by and preparing for new adventures ahead.", type: "major", icon: "🎊" }
    };

    // Observances and Awareness Days
    const observances = {
      "1-15": { title: "National Hat Day", description: "Celebrate the art of accessorizing! Hats can express personality and add flair to any outfit.", type: "observance", icon: "🎩" },
      "1-20": { title: "National Cheese Lover's Day", description: "A day to appreciate the wonderful world of cheese. Try a new variety today!", type: "observance", icon: "🧀" },
      "2-2": { title: "Groundhog Day", description: "Will we have an early spring or six more weeks of winter? Nature has its own way of predicting!", type: "observance", icon: "🦫" },
      "2-9": { title: "National Pizza Day", description: "Celebrating one of the world's most beloved foods. Share a slice with someone special!", type: "observance", icon: "🍕" },
      "3-14": { title: "Pi Day", description: "Celebrating mathematics and the fascinating number π (3.14159...). Math can be delicious too!", type: "observance", icon: "🥧" },
      "4-7": { title: "World Health Day", description: "Raising awareness about global health issues and promoting healthy living for all.", type: "observance", icon: "🏥" },
      "5-4": { title: "Star Wars Day", description: "May the Fourth be with you! A day to celebrate the epic saga that has inspired generations.", type: "observance", icon: "⭐" },
      "6-8": { title: "World Oceans Day", description: "Celebrating our oceans and raising awareness about marine conservation.", type: "observance", icon: "🌊" },
      "7-20": { title: "International Chess Day", description: "Celebrating the game of chess and its benefits for strategic thinking and concentration.", type: "observance", icon: "♟️" },
      "8-8": { title: "International Cat Day", description: "Celebrating our feline friends and the joy they bring to our lives.", type: "observance", icon: "🐱" },
      "9-15": { title: "International Dot Day", description: "Inspired by Peter H. Reynolds' book 'The Dot' - a day to celebrate creativity and courage.", type: "observance", icon: "⚫" },
      "10-5": { title: "World Teachers' Day", description: "Honoring teachers and their vital role in shaping minds and building futures.", type: "observance", icon: "👨‍🏫" },
      "11-13": { title: "World Kindness Day", description: "A day to practice and promote kindness. Small acts of kindness can change the world.", type: "observance", icon: "💖" },
      "12-10": { title: "Human Rights Day", description: "Celebrating the universal declaration of human rights and promoting equality for all.", type: "observance", icon: "🤝" }
    };

    // Weekly Observances
    const weeklyObservances = {
      0: { title: "Sunday - Day of Rest", description: "A day to rest, reflect, and recharge. Take time for yourself and your loved ones.", type: "weekly", icon: "😌" }, // Sunday
      1: { title: "Monday - Fresh Start", description: "A new week begins! Set your intentions and embrace the opportunities ahead.", type: "weekly", icon: "🌅" }, // Monday
      2: { title: "Tuesday - Momentum Day", description: "Build on yesterday's energy and keep moving forward with purpose.", type: "weekly", icon: "🚀" }, // Tuesday
      3: { title: "Wednesday - Midweek Magic", description: "You've made it halfway through the week! Celebrate your progress.", type: "weekly", icon: "✨" }, // Wednesday
      4: { title: "Thursday - Thankful Thursday", description: "Practice gratitude today. What are you thankful for right now?", type: "weekly", icon: "🙏" }, // Thursday
      5: { title: "Friday - Freedom Friday", description: "The weekend is near! Finish strong and prepare for some well-deserved rest.", type: "weekly", icon: "🎉" }, // Friday
      6: { title: "Saturday - Self-Care Saturday", description: "A day to prioritize your well-being and do what brings you joy.", type: "weekly", icon: "💆" } // Saturday
    };

    // Check for major events
    const dateKey = `${month}-${day}`;
    if (majorEvents[dateKey]) {
      events.push(majorEvents[dateKey]);
    }

    // Check for observances
    if (observances[dateKey]) {
      events.push(observances[dateKey]);
    }

    // Add weekly observance
    if (weeklyObservances[dayOfWeek]) {
      events.push(weeklyObservances[dayOfWeek]);
    }

    // Add some random daily inspirations for variety
    const dailyInspirations = [
      { title: "Mindfulness Moment", description: "Take a deep breath and be present in this moment. Notice the beauty around you.", type: "daily", icon: "🧘" },
      { title: "Gratitude Practice", description: "Write down three things you're grateful for today. Gratitude transforms ordinary days into blessings.", type: "daily", icon: "🙏" },
      { title: "Kindness Challenge", description: "Perform one act of kindness today. It could be as simple as a smile or a compliment.", type: "daily", icon: "💝" },
      { title: "Learning Day", description: "Learn something new today. Knowledge is a gift that keeps on giving.", type: "daily", icon: "📚" },
      { title: "Connection Day", description: "Reach out to someone you care about. Human connection is what makes life meaningful.", type: "daily", icon: "🤝" }
    ];

    // If no special events, add a random daily inspiration
    if (events.length === 0) {
      const randomIndex = Math.floor(Math.random() * dailyInspirations.length);
      events.push(dailyInspirations[randomIndex]);
    }

    return events;
  };

  if (isLoading) {
    return (
      <div className="special-tip">
        <div className="tip-content">
          <div className="tip-icon">⏳</div>
          <div>
            <h3 className="tip-title">Loading Today's Special...</h3>
            <p className="tip-text">Discovering what makes today unique...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="special-tip clickable" onClick={() => navigate('/special-days')}>
      <div className="tip-content">
        <div className="tip-icon">{specialDay.icon}</div>
        <div>
          <h3 className="tip-title">
            {specialDay.title}
            {specialDay.type === 'major' && <Star className="major-event-icon" size={16} />}
          </h3>
          <p className="tip-text">{specialDay.description}</p>
          <div className="tip-meta">
            <Calendar size={14} />
            <span>Today's Special</span>
            {specialDay.type === 'major' && (
              <span className="event-type major">Major Event</span>
            )}
            {specialDay.type === 'observance' && (
              <span className="event-type observance">Special Day</span>
            )}
            {specialDay.type === 'weekly' && (
              <span className="event-type weekly">Weekly</span>
            )}
            <ArrowRight size={14} className="click-hint" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialTip;
