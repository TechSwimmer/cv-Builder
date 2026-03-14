import React from "react";
import "../../styles/Footer.css"

const AppFooter = ({ onFeedbackClick }) => {
  return (
    <footer className="auth-footer-global">
    
        <p>© 2024 ResumeBaker. All rights reserved.</p>
        <div className='footer-links'>
          <a href='#privacy'>Privacy Policy</a>
          <a href='https://techdevnikhil.netlify.app' target="_blank" rel="noopener noreferrer">Portfolio</a>
          <button className="feedback-btn" type="button" onClick={onFeedbackClick}>Feedback / Report Bug</button>
          <a href='#terms'>Terms of Service</a>
          <a href='#help'>Help Center</a>
          <a href='#contact'>Contact Us</a>
        </div>
    </footer>
  );
};

export default AppFooter;
