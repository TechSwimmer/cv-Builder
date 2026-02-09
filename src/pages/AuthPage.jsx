import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages styles/AuthPage.css';
import '../styles/pages styles/IntroStyles.css'
import IntroPages from './Intropages.jsx';
import API from "../api.js";
import ResumeBakerLogo from '../components/navbar components/ResumeBakerLogo.jsx';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !username) {
      newErrors.username = 'Username is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setMessage('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await API.post(endpoint, { email, password, username });

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      
      setMessage(isLogin ? 'Login successful!' : 'Account created successfully!');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong';
      setMessage(errorMsg);
      setIsLoading(false);
    }
  };

  const handleGuestAccess = () => {
    navigate('/builder');
  };

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  const showIntroAgain = () => {
    setShowIntro(true);
  };

  return (
    <div className={`auth-page ${!showIntro ? 'intro-closed' : ''}`}>
      {/* Header with branding */}
      <header className='auth-header'>
        <div className='header-content'>
          <ResumeBakerLogo size={40}/>
          <p className='tagline'>Create professional resumes in minutes</p>
        </div>
        {!showIntro && (
          <button className='intro-toggle' onClick={showIntroAgain}>
            Show Tutorial
          </button>
        )}
      </header>

      <div className='auth-layout'>
        {/* Left Panel - Introduction/Tutorial */}
        {showIntro && (
          <div className='intro-panel'>
            <div className='intro-header'>
              <h2>Getting Started</h2>
              <button className='close-intro' onClick={handleIntroFinish}>
                ✕
              </button>
            </div>
            <div className='intro-content-wrapper'>
              <IntroPages onFinish={handleIntroFinish} />
            </div>
            <div className='intro-footer'>
              <button className='skip-btn' onClick={handleIntroFinish}>
                Skip Tutorial
              </button>
              <div className='intro-progress'>
                <span>Interactive Guide</span>
              </div>
            </div>
          </div>
        )}

        {/* Right Panel - Authentication Form */}
        <div className={`auth-panel ${!showIntro ? 'centered' : ''}`}>
          <div className='auth-card'>
            <div className='card-header'>
              <h2>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
              <p>
                {isLogin 
                  ? 'Sign in to access your saved resumes' 
                  : 'Join thousands who landed jobs with professional resumes'
                }
              </p>
            </div>

            <div className='form-switcher'>
              <button 
                className={`switch-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button 
                className={`switch-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className='auth-form'>
              <div className='input-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className='error-msg'>{errors.email}</span>}
              </div>

              {!isLogin && (
                <div className='input-group'>
                  <label htmlFor='username'>Username</label>
                  <input
                    id='username'
                    type='text'
                    placeholder='Choose a username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={errors.username ? 'error' : ''}
                  />
                  {errors.username && <span className='error-msg'>{errors.username}</span>}
                </div>
              )}

              <div className='input-group'>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  placeholder={isLogin ? 'Enter your password' : 'Create a secure password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className='error-msg'>{errors.password}</span>}
              </div>

              {isLogin && (
                <div className='form-options'>
                  <label className='checkbox-label'>
                    <input type='checkbox' /> Remember me
                  </label>
                  <a href='#forgot' className='forgot-link'>Forgot password?</a>
                </div>
              )}

              {message && (
                <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <button 
                type='submit' 
                className='primary-btn'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className='spinner'></span>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>

              <div className='divider'>
                <span>or continue with</span>
              </div>

              <button 
                type='button' 
                className='guest-btn'
                onClick={handleGuestAccess}
              >
                <span className='guest-icon'>👤</span>
                Continue as Guest
                <small>Try without registration</small>
              </button>

              <div className='auth-footer'>
                <p>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button type='button' className='link-btn' onClick={toggleForm}>
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </form>

            <div className='benefits'>
              <h3>Why Register?</h3>
              <ul>
                <li>💾 Save multiple resume versions</li>
                <li>🔄 Access from any device</li>
                <li>📈 Track your applications</li>
                <li>🎨 Exclusive templates</li>
              </ul>
            </div>
          </div>

          <div className='testimonial'>
            <p>"ResumeBaker helped me create a professional CV that got me interviews at top companies!"</p>
            <div className='author'>- Sarah M., Software Engineer</div>
          </div>
        </div>
      </div>

      <footer className='auth-footer-global'>
        <p>© 2024 ResumeBaker. All rights reserved.</p>
        <div className='footer-links'>
          <a href='#privacy'>Privacy Policy</a>
          <a href='#terms'>Terms of Service</a>
          <a href='#help'>Help Center</a>
          <a href='#contact'>Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;