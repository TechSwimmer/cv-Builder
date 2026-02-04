
import React, { useEffect, useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css'
import ResumeBakerLogo from './ResumeBakerLogo.jsx';

const LockedButton = ({ children, label }) => (
    <div className="locked-btn-wrapper">
        <button className="locked-btn" disabled>
            {children}
            
        </button>
         <span className="lock-icon">🔒</span>
        <span className="lock-tooltip">{label}</span>
    </div>
);



const BuilderNavbar = ({
    activeTab,
    setActiveTab,
    handleStylePage,
    currentLayout,
    isLoggedIn,
    handleLayoutClick,
    handleDownloadPDF,
    showSaveDialog,
    setShowSaveDialog,
    showForm,
    setShowForm,
    navigateToDashboard,
    username,
    setUserName,
    onSubmit
}) => {

    const toggleTab = () => {
        const nextTab = activeTab === "style" ? "content" : "style";
        setActiveTab(nextTab);
        handleStylePage(currentLayout);

    };

    const toggleFullScreen = () => {
        setShowForm(!showForm)
        setActiveTab("preview" ? "content" : 'preview')
    }

    username = localStorage.getItem('username')
   
    const navigate = useNavigate();
    return (
        <>
            {isLoggedIn && (
                <nav className="cv-navbar">
                    <div className='userinfo-navbar'>
                        <h2>{username || 'Guest'}'s Workspace </h2>
                    </div>
                    <div className="userinfo-btn-navbar">
                        <button className="active" onClick={toggleTab}>
                            {activeTab === "style" ? "Edit Content" : "Edit Style"}
                        </button>
                        <button
                            className="back-btn"
                            onClick={() => navigateToDashboard('/dashboard')}
                        >
                            Dashboard
                        </button>
                        <button className="fullscreen-edit-btn" onClick={toggleFullScreen}>
                            {showForm === false ? "Edit CV" : "Full Screen"}
                        </button>
                        <button onClick={() => handleDownloadPDF()}>Download PDF</button>
                        <button onClick={() => setShowSaveDialog(true)}>
                            Save CV
                        </button>
                    </div>

                </nav>
            )}
            {!isLoggedIn && (
                <nav className="cv-navbar">
                    <div className='userinfo-navbar' style={{backgroundColor:'aqua'}}>
                        <ResumeBakerLogo size={40}/>
                    </div>
                    <div className="userinfo-btn-navbar">
                        <button className="active" onClick={toggleTab}>
                            {activeTab === "style" ? "Edit Content" : "Edit Style"}
                        </button>
                        <LockedButton label="Sign-in to access dashboard">
                            Dashboard
                        </LockedButton>
                        <button className="fullscreen-edit-btn" onClick={toggleFullScreen}>
                            {showForm === false ? "✏️ Edit CV" : "Full Screen"}
                        </button>
                        <button onClick={() => handleDownloadPDF()}>Download</button>
                        <LockedButton label="Sign-in to save your CV">
                            Save CV
                        </LockedButton>
                        <button onClick={() => navigate('/')}>Sign in</button>
                    </div>

                </nav>
            )}
        </>


    )
}



export default BuilderNavbar;