import React, { useEffect, useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import'../styles/dashboard.css'
import DashboardNavbar from '../components/DashboardNavbar.jsx';

const Dashboard = () => {
    
    const [ cvs, setCvs ] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
        navigate('/');
        
    }
    }, []);
    
    useEffect(() => {
        const fetchUser = async() => {
            try{
                const res = await API.get('/api/auth/user');
                setUsername(res.data.username);
            }
            catch(err) {
                console.error('Failed to fetch user: ', err);
            }
        };

        fetchUser();
    },[])


    useEffect(() => {
        const fetchCvs = async () => {
            try{
                const res = await API.get('/api/cv/all');
                setCvs(res.data); 
            }
            catch(err) {
                console.error(err);
            }
        };
        fetchCvs();
    }, []);

    const deleteCv = async(id) => {
        try{
            console.log(id)
            await API.delete(`/api/cv/${id}`);

            // Remove the deleted CV from the frontend  state

            setCvs(prevCvs => prevCvs.filter(cv => cv._id !== id));
            alert('CV deleted successfully.');
        }
        catch(err) {
            console.error('error deleting CV:', err.response?.data || err.message);
            alert('Failed to delete CV');
        }
    };

    const handleLogout = () => {
        // clear all authentication / session data
        localStorage.removeItem('token');
        sessionStorage.clear();
        localStorage.removeItem('username')
        // optionally show a toast / alert
        alert('you have been logged out.');

        // Redirect to homnepage or login / guest landing
        navigate('/')
    }


    return (
        <div className='dashboard'>
            <div className='dashboard-navbar'>
               <DashboardNavbar
               username = {username}
               handleLogout = {handleLogout}
               />
                
            </div>
           
            <div className='cv-grids'>
                 <div className='cv-grid-left'>
                <h3>Total CV's: {cvs.length}</h3>
                
            </div>
            
            <div className='cv-grid-right'>
                <h2>Created CV's</h2>
                {cvs.map(cv => (
                    <div key={cv._id} className='cv-card'>
                        <h3>{cv.title || 'Untitled CV'}</h3>
                        <div className='cv-card-btns'>
                            <button onClick={() => navigate(`/builder?id=${cv._id}`)}>Edit</button>
                            <button onClick={()=> deleteCv(cv._id)}>Delete</button>
                        </div>
                        
                    </div>
                ))}
                
            </div>
            </div>
           
        </div>
    )
}


export default Dashboard;