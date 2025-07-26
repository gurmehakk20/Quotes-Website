import { useState, useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import api from '../Utils/axios'
import { useNavigate } from 'react-router-dom'
import '../Styles/Auth.css'

const SubmitQuote = () => {
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    category: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.text.trim()) {
      newErrors.text = 'Quote text is required'
    } else if (formData.text.trim().length < 10) {
      newErrors.text = 'Quote must be at least 10 characters long'
    } else if (formData.text.trim().length > 500) {
      newErrors.text = 'Quote must be less than 500 characters'
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required'
    } else if (formData.author.trim().length < 2) {
      newErrors.author = 'Author name must be at least 2 characters'
    }
    
    if (formData.category.trim() && formData.category.trim().length < 2) {
      newErrors.category = 'Category must be at least 2 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setMessage('')
    
    try {
      const res = await api.post('/quotes/submit', formData)
      setMessage(res.data.msg)
      setIsSuccess(true)
      setFormData({ text: '', author: '', category: '' })
      setErrors({})
      
      // Redirect to home after 3 seconds
      setTimeout(() => navigate('/'), 3000)
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to submit quote")
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-card success-card">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
          </div>
          <h2>Quote Submitted Successfully!</h2>
          <p>{message}</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#999' }}>
            Redirecting to home page...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M8 9h8"/>
              <path d="M8 13h6"/>
            </svg>
          </div>
          <h1>Share Your Wisdom</h1>
          <p>Submit a quote that inspires and uplifts others</p>
        </div>

        {message && (
          <div className={`error-message ${isSuccess ? 'success' : ''}`}>
            {message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <textarea
                name="text"
                placeholder="Enter your quote here..."
                value={formData.text}
                onChange={handleChange}
                className={errors.text ? 'error' : ''}
                rows="4"
                style={{
                  resize: 'vertical',
                  minHeight: '120px',
                  fontFamily: 'inherit',
                  paddingTop: '1rem',
                  paddingBottom: '1rem'
                }}
                required
              />
            </div>
            {errors.text && <span className="field-error">{errors.text}</span>}
            <div style={{ fontSize: '0.8rem', color: '#666', textAlign: 'right', marginTop: '0.25rem' }}>
              {formData.text.length}/500 characters
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <input
                type="text"
                name="author"
                placeholder="Author name"
                value={formData.author}
                onChange={handleChange}
                className={errors.author ? 'error' : ''}
                required
              />
            </div>
            {errors.author && <span className="field-error">{errors.author}</span>}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/>
              </svg>
              <input
                type="text"
                name="category"
                placeholder="Category (optional) - e.g., Motivation, Love, Success"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? 'error' : ''}
              />
            </div>
            {errors.category && <span className="field-error">{errors.category}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-button" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Submitting...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
                Submit Quote
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Want to explore quotes instead?{' '}
            <a href="/" className="auth-link">Browse Quotes</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SubmitQuote
