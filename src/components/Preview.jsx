import React from "react";
import "../styles/CvStyles.css";


function Preview({ generalInfo, education, experience, summary, skills}) {

    
    const formatDate = (dateString) => {
        if (!dateString) return ""; // If no date selected, return empty
        const date = new Date(dateString);
        return `${date.toLocaleString("default", { month: "long" })} - ${date.getFullYear()}`;
      };


    return (
        <div className="cv-preview">

            <div className="preview-section-left">
                <div className="preview-section-headers">
                    <h3>{generalInfo.name}</h3>
                    <h4>CONTACT</h4>
                    <p> {generalInfo.email}</p>
                    <p>{generalInfo.phone}</p>
                    <p>{generalInfo.location}</p>
                </div>
                <div className="preview-section-skill">
                    <h3>SKILLS</h3>
                    <ul>
                        {skills.map((skill, index) => {
                            return <li key={index}>{skill.skill}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="preview-section-right">
                <div className="preview-section-summary">
                    <h3>PROFILE</h3>
                    <p>{summary.summary}</p>
                </div>
                <div className="preview-section-education">
                    <h3>EDUCATION</h3>
                    {education.length > 0 ? (
                        education.map((edu, index) => (
                            <div key={index} className="education-entry-preview">
                                <p><strong>{edu.school}</strong></p>
                                <p>{edu.location}</p>
                                <p>{edu.degree}</p>
                                <p>{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
                            </div>
                        ))
                    ) : (
                        <p>No education details added yet.</p>
                    )}
                </div>

                <div className="preview-section-experience">
                    <h3>EMPLOYEMENT HISTORY</h3>
                    {experience.length > 0 ? (
                        experience.map((exp, index) => (
                            <div key={index} className="experience-entry-preview">
                                <p><strong>{exp.position}</strong></p>
                                <p><strong>{exp.company}</strong></p>
                                <p>{exp.location}</p>
                                
                                <p>{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</p>
                            </div>
                        ))
                    ) : (
                        <p>No experience details added yet.</p>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Preview;