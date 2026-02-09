
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../../styles/navbar styles/dashboardNavbar.css'
import ResumeBakerLogo from './ResumeBakerLogo.jsx';

const DashboardNavbar = ({
    username,
    handleLogout
}) => {
    const navigate = useNavigate();
    username = localStorage.getItem('username')


    

    return (
        <>
            <nav className='db-navbar'>
                <nav>
                    <ResumeBakerLogo size={40}/>

                </nav>
                <div className='dashboard-buttons'>
                    <button onClick={() => navigate('/builder')}>+ New CV</button>
                    <button
                        className="logout-btn"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default DashboardNavbar;