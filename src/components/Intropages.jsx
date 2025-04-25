import React, { useState } from "react";
import formImg from "../images/formContent.png";
import previewImg from "../images/previewcontent.png";


const IntroPages = ({ onFinish }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalpages] = useState(4)

    const handleNextpage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
        else {
            localStorage.setItem("hasSeenIntro", "true");
            onFinish();
            window.location.href = "https://resume-baker.netlify.app/";
        }
    }

    const handleSkipIntro = () => {
        localStorage.setItem("hasSeenIntro", "true");
        onFinish();
    };

    return (
        <div className="intro-page-container">
            <div className="intro-backdrop"></div>
            <div className="intro-content">
                {currentPage === 1 && (
                    <div className="first-intro-page">
                        <h1>Welcome to RESUMEBAKER</h1>
                        <p>Fill out your information in simple steps.</p>
                        <p>Watch your CV preview update in real-time.</p>
                        <p>Customize sections like skills, experience, and even add your own.</p>
                        <p>Download a polished PDF instantly.</p>
                        <button onClick={handleNextpage}>Next</button>
                        <button onClick={handleSkipIntro}>Skip</button>
                    </div>
                )}
                {currentPage === 2 && (
                    <div className="second-intro-page">
                        <h1>How to create a CV with Resume-Baker?</h1>
                        <div className="intro-form-info">
                            <div className="intro-form-info-img">
                                <img src={formImg} alt="form-img" />
                            </div>
                            <div className="intro-form-info-text">
                                <h2>Form-Section</h2>
                                <p>The left side of the screen consists of form-section this is where you will find input fields to provide your details</p>
                                <p>Click on the checkboxes above the heading of each section to add or remove them in the preview.</p>
                                
                                <p>Fill out your information in simple steps.</p>
                                <p>The top right corner of the form-section has a EditStyle button that allows you to customize your CV.</p>
                                <p>Customize your CV to fit your needs.</p>
                                <p>Click on the Full-screen preview button to see your CV in full screen.</p>
                            </div>
                        </div>

                        <button onClick={handleNextpage}>Next</button>
                        <button onClick={handleSkipIntro}>Skip</button>
                    </div>
                )}

                {currentPage === 3 && (
                   <div className="third-intro-page">
                        <h1>How to create a CV with Resume-Baker?</h1>
                        <div className="intro-form-preview">
                            <div className="intro-form-preview-text">
                              <h2>Preview-Section</h2>
                              <p>The right side of the screen consists of preview-section this is where your CV will be displayed</p>
                              <p>The preview section is dynamic in nature so you can view it changing in real time.</p>
                            </div>
                            <div className="intro-form-preview-img">
                                <img src={previewImg} alt="preview-img" />
                            </div>
                        </div>
                        <button onClick={handleNextpage}>Next</button>
                        <button onClick={handleSkipIntro}>Skip</button>
                   </div>
                )}
                {currentPage == 4 && (
                     <div className="fourth-page-intro">
                     <h1>Final tips and tricks</h1>
                     <p>Now that you understand how things work you can :</p>
                     <p>Start building your CV today and take the first step towards your dream job</p>
                     <p>Create a professional-looking CV in minutes with resume-baker</p>
                    <p>Download your CV in a PDF format.</p>
                     <button onClick={handleNextpage}>Get Started</button>
                     <button onClick={handleNextpage}>End Intro</button>
                 </div>
                )}
            </div>
        </div>
    )
}

export default IntroPages;