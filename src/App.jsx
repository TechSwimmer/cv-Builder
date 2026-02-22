
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ResumeLoading from './components/animations/ResumeLoading';

import AuthPage from './pages/AuthPage';
import CvBuilder from './pages/CvBuilder';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
// import API

function App() {

  const [globalLoading, setGlobalLoading] = useState(false)
 

  return (
    <BrowserRouter>
     <div className='app-scale'>
      {globalLoading && (
        <ResumeLoading/>
        )}
      <Routes>
       
        <Route path='/' element={<AuthPage setGlobalLoading={setGlobalLoading}/>}/>
        <Route path='/builder' element={<CvBuilder setGlobalLoading={setGlobalLoading}/>}/>
        
        <Route path="/dashboard" element={<Dashboard setGlobalLoading={setGlobalLoading}/>} /> 
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



