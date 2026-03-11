
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import '../../styles/navbar styles/dashboardNavbar.css'
import ResumeBakerLogo from './ResumeBakerLogo.jsx';
import { uploadResume } from "../../services/resumeUpload.service.js"


import API from '../../api.js';

const DashboardNavbar = ({
    username,
    handleLogout,
    setGlobalLoading
}) => {
    const navigate = useNavigate();
    username = localStorage.getItem('username')

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cvDownloads, setCvDownloads] = useState(0);

    useEffect(() => {
        let mounted = true;
        API.get("/api/metrics/public")
            .then((res) => {
                if (mounted) setCvDownloads(res.data?.cvDownloads || 0);
            })
            .catch(() => { });
        return () => { mounted = false; };
    }, []);


    return (
        <>
            <nav className='db-navbar'>
                <nav>
                    <ResumeBakerLogo size={40} />
                    
                </nav>
                
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen((v) => !v)}
                    aria-expanded={mobileMenuOpen}
                    aria-controls="builder-mobile-actions"
                >
                    ☰ Menu
                </button>
                 
                <div
                    id="builder-mobile-actions"
                    className={`userinfo-btn-navbar ${mobileMenuOpen ? "open" : ""} dashboard-buttons`}
                >
                   <div className="download-counter">Created {cvDownloads} CVs. </div>
                    <label className='nav-upload'>
                        Import Resume
                        <input
                            type='file'
                            accept='pdf'
                            hidden
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                const result = await uploadResume(file, navigate, setGlobalLoading);
                                if (!result.success) {
                                    alert(result.message); // or set local toast/message state
                                }
                                setMobileMenuOpen(false);
                            }}
                        ></input>
                    </label>
                    <button onClick={() => { navigate('/builder'); setMobileMenuOpen(false); }}>+ New CV</button>
                    <button
                        className="logout-btn"
                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    >
                        Logout
                    </button>
                </div>

            </nav>
        </>
    )
}

export default DashboardNavbar;