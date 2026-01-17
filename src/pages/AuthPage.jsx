import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css'
import IntroPages from '../components/Intropages';
import API from "../api.js"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);

    setMessage('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await API.post(endpoint, { email,password,username });
      console.log('Register payload:', { email, username });

      localStorage.setItem('token', data.token);
      localStorage.setItem('username',data.user.username)
      setMessage('Success!');
      navigate('/dashboard');                     // redirect after Login/register
    }
    catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };


  return (
    <div className='auth-intro-container'>
    <div className='intro-container'> 
      <IntroPages/>
    </div>
      <div className='auth-container'>
        <h2>{isLogin ? 'Login' : ' Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            
          />
          {!isLogin && (
                <input 
            type='username'
            placeholder='Username'
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
           
          />
          )}
      
          <div className='button-container'>
          <button className="auth-btn" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
          <button className='auth-btn' type='click' onClick={()=> navigate('/builder')}>
            Continue as Guest
          </button>
          </div>
          <p onClick={toggleForm}>
            {isLogin ? 'Need an account? Register' : 'Already registered? Login'}
          </p>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>

  )
}





export default AuthPage;