
import React, { useEffect, useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboardNavbar.css'


const DashboardNavbar = ({
    username,
    handleLogout
}) => {


    return (
        <>
            <nav className='db-navbar'>
                <div className='dashboard-info'>
                        <h2>Welcome {username || 'Guest'}   </h2>
                </div>
                <div className='dashboard-buttons'>
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