
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import AuthPage from './pages/AuthPage';
import CvBuilder from './pages/CvBuilder';
import Dashboard from './pages/Dashboard';
// import API

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



