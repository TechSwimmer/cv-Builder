import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AuthPage from './pages/AuthPage';
import CvBuilder from './pages/CvBuilder';
import IntroPages from './components/Intropages';
import Dashboard from './pages/Dashboard';
// import API
import API from '../src/api'
import { useState } from 'react';

function App() {

 
  
 

 



  

  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/builder' element={<CvBuilder/>}/>
        
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// tabled structure of return statement


// Feature	-------------------------- Purpose
// showForm	-------------------------- Toggles visibility of the form section
// activeTab	------------------------ Determines whether the user is editing content, styles, or previewing
// previewRef	------------------------ Reference to the preview DOM node for generating a PDF
// showIntro	------------------------ Displays an intro/tutorial overlay on first visit
// handleDownloadPDF()	-------------- Triggered to generate and download the resume as PDF
// handleEditClick()	---------------- Switches back to editing mode from preview
// onfinish()	------------------------ Redirects to the main page of the app
// handleSubmit()	--------------------- Switches to preview mode from form
// handleMouseEnter() ---------------- Toggles visibility of the layout thumbnails
// handleMouseLeave() ---------------- Toggles visibility of the layout thumbnails
// handleLayoutClick() --------------- 
// setVisibleSections ----------------- Sets the visibility of sections in the form
// 