
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AuthPage from './pages/AuthPage';
import CvBuilder from './pages/CvBuilder';
import Dashboard from './pages/Dashboard';
// import API

function App() {

 

  return (
    <BrowserRouter>
     <div className='app-scale'>
      <Routes>
       
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/builder' element={<CvBuilder/>}/>
        
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



