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
       
    }

    const handlePrevPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        
    }


    const handleSkipIntro = () => {
        localStorage.setItem("hasSeenIntro", "true");
        onFinish();
    };

    return (
        <div className="intro-page-container">
           
            <div className="intro-content">
                {currentPage === 1 && (
                    <div className="first-intro-page">
                        <h1>Build a professional CV in minutes</h1>
                        <p>ResumeBaker lets you create, preview, and download a polished CV instantly.</p>
                        <p>No design skills. No complexity</p>
                        <p>Watch your CV preview update in real-time.</p>
                        <p>Customize sections like skills, experience, and even add your own.</p>
                        <p>Download a polished PDF instantly.</p>
                        
                        
                        <button onClick={handleNextpage}>Next</button>
                        
                    </div>
                )}
                {currentPage === 2 && (
                    <div className="second-intro-page">
                        <h2>Simple, guided CV creation</h2>
                        <div className="intro-section">
                            <div className="intro-image">
                                <img src={formImg} alt="form-img" />
                            </div>
                            <div className="intro-text">
                                
                                <p>Fill your details on the left</p>
                                <p>See your CV update live on the right.</p>
                                <p>Fill out your information in simple steps.</p>
                                <p>No guessing, no surprises.</p>
                                <p>Customize your CV to fit your needs.</p>
                                <p>Click on the Full-screen preview button to see your CV in full screen.</p>
                            </div>
                        </div>

                        <button onClick={handleNextpage}>Next</button>
                        <button onClick={handlePrevPage}>Back</button>
                    </div>
                )}

                {currentPage === 3 && (
                   <div className="third-intro-page">
                        <h2>Real-time preview & layouts</h2>
                        <div className="intro-section">
                            <div className="intro-text">
                              
                              <p>Instant preview as you type.</p>
                              <p>Multiple layouts.</p>
                              <p>Full-screen preview before download.</p>
                            </div>
                            <div className="intro-image">
                                <img src={previewImg} alt="preview-img" />
                            </div>
                        </div>
                        <button onClick={handleNextpage}>Next</button>
                        <button onClick={handlePrevPage}>Back</button>
                   </div>
                )}
                {currentPage == 4 && (
                    <div className="fourth-page-intro">
                    <h1>You’re in control.</h1>
                    
                    <p>Start building your CV today and take the first step towards your dream job</p>
                    <p>Create a professional-looking CV in minutes with resume-baker</p>
                    <p>Register and login to save your CV in different layouts which can be accessed later and edited as you want.</p>
                    <p>Continue as a guest to build and download instantly.</p>
                    <p>Download your CV in a PDF format.</p>
                     
                     <button onClick={handlePrevPage}>Back</button>
                 </div>
                )}
            </div>
        </div>
    )
}

export default IntroPages;