// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav style={{ padding: '1rem', background: '#fff0e5' }}>
//       <Link to="/">Home</Link> |{" "}
//       <Link to="/explore">Explore</Link> |{" "}
//       <Link to="/add">Add Quote</Link> |{" "}
//       <Link to="/profile">Profile</Link> |{" "}
//       <Link to="/login">Login</Link>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Heart } from 'lucide-react';
import '../Styles/Navbar.css';

const Navbar = () => {
  const navLinks = ['Home', 'Explore', 'Add Quote', 'Profile', 'Login'];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Heart className="heart-icon" fill="currentColor" />
          <span className="logo-text">QuoteQuest</span>
        </div>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link} href="#" className="nav-link">
              {link}
            </a>
          ))}
        </div>

        <div className="navbar-mobile">
          <button className="menu-button">
            <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
