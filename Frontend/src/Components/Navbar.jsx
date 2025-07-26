import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-icon">💭</div>
          <span className="brand-text">QuoteFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          
          <Link to="/public-quotes" className="nav-link" onClick={closeMenu}>
            Explore
          </Link>
          {user && (
            <Link to="/submit-quote" className="nav-link" onClick={closeMenu}>
              Submit
            </Link>
          )}
        </div>

        {/* Authentication Section */}
        <div className="navbar-auth">
          {user ? (
            <div className="user-section">
              <div className="user-info">
                <User size={16} />
                <span className="username">{user.username}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="auth-btn register-btn">
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/all-quotes" className="mobile-nav-link" onClick={closeMenu}>
          All Quotes
        </Link>
        <Link to="/public-quotes" className="mobile-nav-link" onClick={closeMenu}>
          Explore
        </Link>
        {user && (
          <Link to="/submit-quote" className="mobile-nav-link" onClick={closeMenu}>
            Submit Quote
          </Link>
        )}
        {user && (
          <Link to="/profile" className="mobile-nav-link" onClick={closeMenu}>
            Profile
          </Link>
        )}
        
        {/* Mobile Auth Section */}
        <div className="mobile-auth">
          {user ? (
            <div className="mobile-user-info">
              <div className="mobile-user-details">
                <User size={16} />
                <span>{user.username}</span>
              </div>
              <button className="mobile-logout-btn" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="mobile-auth-buttons">
              <Link to="/login" className="mobile-auth-btn" onClick={closeMenu}>
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="mobile-auth-btn" onClick={closeMenu}>
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
