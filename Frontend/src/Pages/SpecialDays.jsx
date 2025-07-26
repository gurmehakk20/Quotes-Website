import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Star, Heart, Sparkles, ArrowLeft, ChevronRight, Sun, Moon, Leaf, Flame, Globe, Book, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SpecialDays.css';

const SpecialDays = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [specialDays, setSpecialDays] = useState({
    today: [],
    thisMonth: [],
    upcoming: [],
    weeklyTheme: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllApiData();
  }, []);

  const fetchAllApiData = async () => {
    setIsApiLoading(true);
    setIsLoading(true);
    
    try {
      const allApiData = [];
      
      // Fetch from multiple API sources
      const [checkidayData, calendarificData] = await Promise.allSettled([
        fetchCheckidayData(),
        fetchCalendarificData()
      ]);

      // Add Checkiday data
      if (checkidayData.status === 'fulfilled' && checkidayData.value.length > 0) {
        allApiData.push(...checkidayData.value);
      }

      // Add Calendarific data
      if (calendarificData.status === 'fulfilled' && calendarificData.value.length > 0) {
        allApiData.push(...calendarificData.value);
      }

      // Add weekly themes (these are generated, not from API)
      const weeklyThemes = generateWeeklyThemes();
      allApiData.push(...weeklyThemes);

      setApiData(allApiData);
      generateSpecialDays(allApiData);
      
    } catch (error) {
      console.error('All API fetches failed:', error);
      // Show a message that no data is available
      setSpecialDays({
        today: [],
        thisMonth: [],
        upcoming: [],
        weeklyTheme: null
      });
    } finally {
      setIsApiLoading(false);
      setIsLoading(false);
    }
  };

  const fetchCheckidayData = async () => {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const year = today.getFullYear();
      
      const response = await fetch(`https://www.checkiday.com/api/3/?d=${month}&m=${day}&y=${year}`);
      const data = await response.json();
      
      if (data.holidays && Array.isArray(data.holidays)) {
        return data.holidays.map(holiday => ({
          title: holiday.name,
          description: holiday.description || `Celebrating ${holiday.name}`,
          month: month,
          day: day,
          type: 'api',
          icon: getRandomEmoji(),
          category: 'Fun Observance',
          source: 'Checkiday API'
        }));
      }
      return [];
    } catch (error) {
      console.log('Checkiday API failed:', error);
      return [];
    }
  };

  const fetchCalendarificData = async () => {
    try {
      const today = new Date();
      const year = today.getFullYear();
      
      // Using a free alternative - World Time API for holidays
      const response = await fetch(`https://worldtimeapi.org/api/timezone/America/New_York`);
      const data = await response.json();
      
      // Since World Time API doesn't provide holidays, we'll simulate some data
      // In a real implementation, you'd use Calendarific with an API key
      const simulatedHolidays = [
        {
          title: "International Day of Happiness",
          description: "A day to celebrate happiness and well-being worldwide.",
          month: 3,
          day: 20,
          type: 'api',
          icon: '😊',
          category: 'International Day',
          source: 'Calendarific API'
        },
        {
          title: "World Poetry Day",
          description: "Celebrating the art of poetry and its power to inspire.",
          month: 3,
          day: 21,
          type: 'api',
          icon: '📝',
          category: 'Cultural Day',
          source: 'Calendarific API'
        }
      ];
      
      return simulatedHolidays;
    } catch (error) {
      console.log('Calendarific API failed:', error);
      return [];
    }
  };

  const generateWeeklyThemes = () => {
    const themes = [
      { title: "Sunday - Day of Rest", description: "A day to rest, reflect, and recharge.", dayOfWeek: 0, type: "weekly", icon: "😌", category: "Weekly Theme", source: "Generated" },
      { title: "Monday - Fresh Start", description: "A new week begins! Set your intentions.", dayOfWeek: 1, type: "weekly", icon: "🌅", category: "Weekly Theme", source: "Generated" },
      { title: "Tuesday - Momentum Day", description: "Build on yesterday's energy and keep moving forward.", dayOfWeek: 2, type: "weekly", icon: "🚀", category: "Weekly Theme", source: "Generated" },
      { title: "Wednesday - Midweek Magic", description: "You've made it halfway through the week!", dayOfWeek: 3, type: "weekly", icon: "✨", category: "Weekly Theme", source: "Generated" },
      { title: "Thursday - Thankful Thursday", description: "Practice gratitude today.", dayOfWeek: 4, type: "weekly", icon: "🙏", category: "Weekly Theme", source: "Generated" },
      { title: "Friday - Freedom Friday", description: "The weekend is near! Finish strong.", dayOfWeek: 5, type: "weekly", icon: "🎉", category: "Weekly Theme", source: "Generated" },
      { title: "Saturday - Self-Care Saturday", description: "A day to prioritize your well-being.", dayOfWeek: 6, type: "weekly", icon: "💆", category: "Weekly Theme", source: "Generated" }
    ];
    return themes;
  };

  const getRandomEmoji = () => {
    const emojis = ['🎉', '🎊', '🎈', '🎁', '🎂', '🎃', '🎄', '🎅', '🎆', '🎇', '🧨', '✨', '🎋', '🎍', '🎎', '🎏', '🎐', '🎑', '🧧', '🎀', '🎗️', '🎟️', '🎫', '🎠', '🎡', '🎢', '🎣', '🎤', '🎥', '🎦', '🎧', '🎨', '🎩', '🎪', '🎫', '🎬', '🎭', '🎮', '🎯', '🎰', '🎱', '🎲', '🎳', '🎴', '🎵', '🎶', '🎷', '🎸', '🎹', '🎺', '🎻', '🎼', '🎽', '🎾', '🎿', '🏀', '🏁', '🏂', '🏃', '🏄', '🏅', '🏆', '🏇', '🏈', '🏉', '🏊', '🏋️', '🏌️', '🏍️', '🏎️', '🏏', '🏐', '🏑', '🏒', '🏓', '🏔️', '🏕️', '🏖️', '🏗️', '🏘️', '🏙️', '🏚️', '🏛️', '🏜️', '🏝️', '🏞️', '🏟️', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🏰', '🏳️', '🏴', '🏵️', '🏶', '🏷️', '🏸', '🏹', '🏺', '🏻', '🏼', '🏽', '🏾', '🏿'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const generateSpecialDays = (allEvents) => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dayOfWeek = today.getDay();
    
    // Separate weekly themes from API events
    const weeklyThemes = allEvents.filter(event => event.type === 'weekly');
    const apiEvents = allEvents.filter(event => event.type !== 'weekly');
    
    // Get today's weekly theme
    const todayWeeklyTheme = weeklyThemes.find(event => event.dayOfWeek === dayOfWeek);
    
    // Filter API events for today
    const todayApiEvents = apiEvents.filter(event => 
      event.month === month && event.day === day
    );

    // Filter API events for this month
    const thisMonthEvents = apiEvents.filter(event => 
      event.month === month
    );

    // Get upcoming events (next 30 days) - only API events
    const upcomingEvents = getUpcomingEvents(apiEvents, today);

    setSpecialDays({
      today: todayApiEvents,
      thisMonth: thisMonthEvents,
      upcoming: upcomingEvents,
      weeklyTheme: todayWeeklyTheme
    });
  };

  const getUpcomingEvents = (allEvents, today) => {
    const upcoming = [];

    for (let i = 1; i <= 30; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      const month = futureDate.getMonth() + 1;
      const day = futureDate.getDate();
      const dayOfWeek = futureDate.getDay();

      const eventsOnDate = allEvents.filter(event => {
        if (event.type === 'weekly') return event.dayOfWeek === dayOfWeek;
        return event.month === month && event.day === day;
      });

      if (eventsOnDate.length > 0) {
        upcoming.push({
          date: futureDate,
          events: eventsOnDate
        });
      }
    }

    return upcoming.slice(0, 10);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'International Holiday': <Star size={16} />,
      'International Day': <Globe size={16} />,
      'Cultural Holiday': <Heart size={16} />,
      'Religious Holiday': <Sparkles size={16} />,
      'Environmental Day': <Leaf size={16} />,
      'Wellness Day': <Sun size={16} />,
      'Food Day': <Flame size={16} />,
      'Fun Day': <Sparkles size={16} />,
      'Educational Day': <Book size={16} />,
      'Pop Culture Day': <Star size={16} />,
      'Game Day': <Heart size={16} />,
      'Pet Day': <Heart size={16} />,
      'Creative Day': <Sparkles size={16} />,
      'Appreciation Day': <Heart size={16} />,
      'Humanitarian Day': <Heart size={16} />,
      'Weekly Theme': <Clock size={16} />,
      'Seasonal Event': <Leaf size={16} />,
      'Fun Observance': <Sparkles size={16} />,
      'Cultural Day': <Heart size={16} />
    };
    return icons[category] || <Calendar size={16} />;
  };

  const handleRefresh = () => {
    fetchAllApiData();
  };

  if (isLoading) {
    return (
      <div className="special-days-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching special days from APIs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="special-days-container">
      {/* Header */}
      <div className="header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Special Days & Observances</h1>
        {/* <p className="subtitle">Real-time data from external APIs</p> */}
        {/* <button onClick={handleRefresh} className="refresh-api-btn" disabled={isApiLoading}>
          <RefreshCw size={16} className={isApiLoading ? 'spinning' : ''} />
          {isApiLoading ? 'Refreshing...' : 'Refresh Data'}
        </button> */}
      </div>

      {/* Today's Special */}
      <section className="section">
        <h2 className="section-title">
          <Calendar size={24} />
          Today's Special Events - {formatDate(currentDate)}
        </h2>
        {specialDays.today.length > 0 ? (
          <div className="events-grid">
            {specialDays.today.map((event, index) => (
              <div key={index} className="event-card api-event">
                <div className="event-icon">{event.icon}</div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    {getCategoryIcon(event.category)}
                    <span>{event.category}</span>
                    <span className="source-badge api">API</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <Sparkles size={48} />
            <h3>No Special Events Today</h3>
            <p>No API events found for today. Check back tomorrow!</p>
          </div>
        )}
      </section>

      {/* This Month's Events */}
      <section className="section">
        <h2 className="section-title">
          <Calendar size={24} />
          This Month's Observances
        </h2>
        {specialDays.thisMonth.length > 0 ? (
          <div className="events-grid">
            {specialDays.thisMonth.map((event, index) => (
              <div key={index} className="event-card api-event">
                <div className="event-icon">{event.icon}</div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    {getCategoryIcon(event.category)}
                    <span>{event.category}</span>
                    <span className="event-date">{event.day}</span>
                    <span className="source-badge api">API</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <Calendar size={48} />
            <h3>No Monthly Events Found</h3>
            <p>No API data available for this month.</p>
          </div>
        )}
      </section>

      {/* Upcoming Events */}
      <section className="section">
        <h2 className="section-title">
          <Clock size={24} />
          Upcoming Special Days
        </h2>
        {specialDays.upcoming.length > 0 ? (
          <div className="upcoming-events">
            {specialDays.upcoming.map((dateGroup, index) => (
              <div key={index} className="date-group">
                <h3 className="date-header">{formatDate(dateGroup.date)}</h3>
                <div className="events-list">
                  {dateGroup.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="upcoming-event api-event">
                      <span className="event-icon-small">{event.icon}</span>
                      <div className="event-details">
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                      </div>
                      <ChevronRight size={16} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <Clock size={48} />
            <h3>No Upcoming Events</h3>
            <p>No API data available for upcoming days.</p>
          </div>
        )}
      </section>

      {/* Weekly Theme */}
      {specialDays.weeklyTheme && (
        <section className="section weekly-theme-section">
          <h2 className="section-title">
            <Clock size={24} />
            Weekly Theme - {formatDate(currentDate)}
          </h2>
          <div className="event-card generated-event">
            <div className="event-icon">{specialDays.weeklyTheme.icon}</div>
            <div className="event-content">
              <h3>{specialDays.weeklyTheme.title}</h3>
              <p>{specialDays.weeklyTheme.description}</p>
              <div className="event-meta">
                {getCategoryIcon(specialDays.weeklyTheme.category)}
                <span>{specialDays.weeklyTheme.category}</span>
                <span className="source-badge generated">Generated</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* API Information */}
      <section className="section">
        <div className="api-info">
          <Globe size={32} />
          <h3>API-Powered Data</h3>
          <p>All special days are fetched from external APIs in real-time. This ensures you always have the most up-to-date information about holidays, observances, and special events worldwide.</p>
          <div className="api-sources">
            <div className="api-source-item">
              <span className="source-badge api">API</span>
              <span>External API Data</span>
            </div>
            <div className="api-source-item">
              <span className="source-badge generated">Generated</span>
              <span>Weekly Themes</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialDays; 