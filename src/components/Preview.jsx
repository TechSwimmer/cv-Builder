import React, { useEffect,forwardRef } from "react";
import { FaGithub, FaLinkedin, FaPhone, FaLocationArrow, FaBriefcase } from "react-icons/fa";
import { MdEmail } from "react-icons/md"

import EditStyle from "./EditStyle";
import "../styles/CvStyles.css";
import Projects from "./Projects";

const Preview = forwardRef((props, ref) => {

    const { style } = props;


    const { generalInfo, education, experience, summary, skills, className, projects, customStyles,updateStyles } = props;
    const formatDate = (dateString) => {
        if (!dateString) return "Present";  // Default for empty values
        const date = new Date(dateString);
        if (isNaN(date)) return "Invalid Date"; // Prevents crashes
        return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
    };


    return (
        
            

        <div className={`cv-preview ${className}`} id="cv-preview" ref={ref} style={{fontSize:style.fontSize,backgroundColor:style.backgroundColorRight}}>                                                                            
            <div className="preview-section-left" style={{backgroundColor:style.backgroundColorLeft}}>
                <div className="preview-section-headers"  style={{backgroundColor:style.backgroundColorLeft, color:style.textColorLeft}}>
                    <h3 style={{ fontSize: style.fontHeaderSize }} className="cv-text">{generalInfo?.name || "Your name"}</h3>

                    {generalInfo.email && (
                        <p style={{ fontSize: style.fontContentSize }}  className="cv-text">
                            <MdEmail className="icon" /> {generalInfo.email}
                        </p>
                    )}
                    {generalInfo.phone && (
                        <p style={{ fontSize: style.fontContentSize }}  className="cv-text">
                            <FaPhone className="icon" /> {generalInfo.phone}
                        </p>
                    )}
                    {generalInfo.location && (
                        <p style={{ fontSize: style.fontContentSize }} className="cv-text" >
                            <FaLocationArrow className="icon" /> {generalInfo.location}
                        </p>
                    )}
                    {generalInfo.github && (
                        <p style={{ fontSize: style.fontContentSize }} className="cv-text" >
                            <FaGithub className="icon" /> {generalInfo.github}
                        </p>
                    )}
                      {generalInfo.linkedin && (
                        <p style={{ fontSize: style.fontContentSize }} className="cv-text" >
                            <FaLinkedin className="icon" /> {generalInfo.linkedin}
                        </p>
                    )}
                      {generalInfo.website && (
                        <p style={{ fontSize: style.fontContentSize }}  className="cv-text">
                            <FaBriefcase className="icon" /> {generalInfo.website}
                        </p>
                    )}
                   
                </div>
                <div className="preview-section-education"  style={{backgroundColor:style.backgroundColorLeft, color:style.textColorLeft}}>
                    <h3 style={{ fontSize: style.fontHeaderSize }}  className="cv-text">EDUCATION</h3>
                    {education.length > 0 ? (
                        education.map((edu, index) => (
                            <div key={index} className="education-entry-preview">
                                <p style={{ fontSize: style.fontContentSize }} className="stronger-font cv-text">{edu?.school || "Your school"}</p>
                                <p style={{ fontSize: style.fontContentSize }}  className="cv-text">{edu?.location || "School address"}</p>
                                <p style={{ fontSize: style.fontContentSize }}  className="cv-text">{edu?.degree || "Your degree"}</p>
                                <p style={{ fontSize: style.fontContentSize }} className="stronger-font cv-text"  >{formatDate(edu?.startDate || "start date")} — {formatDate(edu?.endDate || "end Date")}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: style.fontContentSize }}>No education details added yet.</p>
                    )}
                </div>
                <div className="preview-section-skill"  style={{backgroundColor:style.backgroundColorLeft, color:style.textColorLeft}}>
                    <h3 style={{ fontSize: style.fontHeaderSize }}  className="cv-text">SKILLS</h3>
                    <ul className="skill-list-main">
                        {skills.map((skill, index) => (
                            <li key={index} className="skill-list-item cv-text" style={{backgroundColor:style.skillTabColor}}>{skill?.skill || "Your skill"}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="preview-section-right" >
                <div className="preview-section-summary" style={{backgroundColor:style.backgroundColorRight, color:style.textColorRight}}>
                    <h3 style={{ fontSize: style.fontHeaderSize }}  className="cv-text">PROFILE</h3>
                    <p style={{ fontSize: style.fontContentSize }}  className="cv-text">{summary?.summary || "Your summary"}</p>
                </div>

                <div className="preview-section-experience" style={{backgroundColor:style.backgroundColorRight, color:style.textColorRight}}>
                    <h3 style={{ fontSize: style.fontHeaderSize }}  className="cv-text">EMPLOYMENT HISTORY</h3>
                    {experience.length > 0 ? (
                        experience.map((exp, index) => (
                            <div key={index} className="experience-entry-preview">
                                <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize }}>{exp?.position || "Your position"}</p>
                                <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize }}>{exp?.company || "Your company"}</p>
                                <p style={{ fontSize: style.fontContentSize }}  className="cv-text">{exp?.location || "Your exp"}</p>
                                <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize }}>{formatDate(exp?.startDate || "Start date")} — {formatDate(exp?.endDate || "End date")}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: style.fontContentSize }}  className="cv-text">No experience details added yet.</p>
                    )}
                </div>
                <div className="preview-section-project" style={{backgroundColor:style.backgroundColorRight, color:style.textColorRight}}>
                    <h3 style={{ fontSize: style.fontHeaderSize }}  className="cv-text">PROJECTS</h3>
                    {projects.length > 0 ? (
                        projects.map((proj, index) => (
                            <div key={index} className="project-entry-preview">
                                <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize }}>{proj?.title || "Your project title"}</p>
                                <p style={{ fontSize: style.fontContentSize }}  className="cv-text">{proj?.description || "Your project description"}</p>
                                <p style={{ fontSize: style.fontContentSize }} className="cv-text" >{proj?.category || "Your project category"}</p>

                                {/* Display skills used */}
                                <div className="project-skills">
                                    <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize }}>Skills used:</p>
                                    <ul className="skill-list-projects">
                                        {proj?.skillsUsed?.length > 0 ? (
                                            proj.skillsUsed.map((skill, i) => (
                                                <li key={i} className="skill-item cv-text" style={{backgroundColor:style.skillTabColor}}>{skill}</li>
                                            ))) : (
                                            <li>no skills added</li>
                                        )
                                        }
                                    </ul>
                                </div>

                                {/* display key feature */}
                                <div className="project-key-feature">
                                    <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize }}>Key features:</p>
                                    <ul className="feature-list">
                                        {proj?.keyFeatures?.length > 0 ? (
                                            proj.keyFeatures.map((feature, i) => (
                                                <li key={i} className="feature-item cv-text" style={{ fontSize: style.fontContentSize }}>{feature}</li>
                                            ))) : (
                                            <li>No key features added</li>
                                        )}
                                    </ul>
                                </div>
                                <p className="stronger-font" style={{ fontSize: style.fontContentSize }}>
                                    <strong>Project Link :</strong>{" "}
                                    {proj.link ? (
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                            {proj.link}
                                        </a>
                                    ) : (
                                        "No link provided"
                                    )}
                                </p>
                            </div>

                        ))

                    ) : (<p style={{ fontSize: style.fontContentSize }}  className="cv-text">No projects added yet</p>)  // added feedback
                    }
                </div>
            </div>

        </div>
        
    );
});

export default Preview;