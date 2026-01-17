import React, { useEffect, useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'
import DashboardNavbar from '../components/DashboardNavbar.jsx';

const Dashboard = () => {

    const [cvs, setCvs] = useState([]);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');

        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get('/api/auth/user');
                setUsername(res.data.username);
            }
            catch (err) {
                console.error('Failed to fetch user: ', err);
            }
            finally{
                setLoading(false);
            }
        };

        fetchUser();
    }, [])


    useEffect(() => {
        const fetchCvs = async () => {
            try {
                const res = await API.get('/api/cv/all');
                setCvs(res.data);
            }
            catch (err) {
                console.error(err);
            }
            finally{
                setLoading(false);
            }
        };
        fetchCvs();
    }, []);

    const deleteCv = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this CV?")) return;
            console.log(id)
            await API.delete(`/api/cv/${id}`);

            // Remove the deleted CV from the frontend  state

            setCvs(prevCvs => prevCvs.filter(cv => cv._id !== id));
            alert('CV deleted successfully.');
        }
        catch (err) {
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
                    username={username}
                    handleLogout={handleLogout}
                />

            </div>
            {loading && <p>Loading your CVs...</p>}

            <div className='cv-grids'>
                {cvs.length === 0 ? (
                    <div>
                    <h2>No CVs yet</h2>
                    <p>Create your first CV to get started</p>
                    </div>
                ) : ( <h2>Created CV's:{cvs.length}</h2>)}
               

                <div className='cv-grid'>

                    {cvs.map(cv => (
                        <div key={cv._id} className="cv-card">
                            <div className="cv-thumbnail">
                                <img
                                    src={cv.thumbnail || "/cv-placeholder.png"}
                                    alt={cv.title || "CV preview"}
                                />
                            </div>

                            <h3>{cv.title || "Untitled CV"}</h3>

                            <div className="cv-card-btns">
                                <button onClick={() => navigate(`/builder?id=${cv._id}`)}>
                                    Edit
                                </button>
                                <button onClick={() => deleteCv(cv._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                  
                    <div
                        className="cv-card create-new"
                        onClick={() => navigate("/builder")}
                    >
                        <div className="plus-icon">+</div>
                        <p>Create New CV</p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Dashboard;