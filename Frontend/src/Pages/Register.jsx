import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import api from '../Utils/axios';
import '../Styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      setSuccess(true);
      
      // Auto-login after successful registration
      login(response.data);
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response?.data?.msg) {
        setErrors({ general: error.response.data.msg });
      } else if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.path] = err.msg;
        });
        setErrors(backendErrors);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card success-card">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h2>Registration Successful!</h2>
          <p>Welcome to QuoteFlow! You're being redirected...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">💭</div>
          <h1>Create Account</h1>
          <p>Join QuoteFlow and start sharing your favorite quotes</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="error-message">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.username && <span className="field-error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                Create Account
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
