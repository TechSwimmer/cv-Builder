import React, { forwardRef } from "react";
import { FaGithub, FaLinkedin, FaPhone, FaLocationArrow, FaBriefcase } from "react-icons/fa";
import { MdEmail } from "react-icons/md"



import "../styles/CvStyles.css";


const Preview = forwardRef((props, ref) => {

    const { style } = props;
    


    const { generalInfo, education, experience, summary, skills, className, projects, hobbies, languages, custom,visibleSections } = props;
        const formatDate = (dateString) => {
            if (!dateString) return "Present";  // Default for empty values
            const date = new Date(dateString);
            if (isNaN(date)) return "Invalid Date"; // Prevents crashes
            return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
        };


    return (



        <div className={`cv-preview ${className}`} id="cv-preview" ref={ref} style={{ fontSize: style.fontSize, backgroundColor: style.backgroundColorRight }}>
            <div className="preview-section-left" style={{ backgroundColor: style.backgroundColorLeft }}>
                <div className="preview-section-headers" style={{ backgroundColor: style.backgroundColorLeft, color: style.textColorLeft }}>
                    <div className="preview-sec-name-title">
                    <h1   style={{ fontSize: style.fontNameSize,fontFamily: style.fontFamilyHeader }} className="cv-text preview-sec-name">{generalInfo?.name || "YOUR NAME"}</h1>
                    {generalInfo.title && (
                        <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader }} className="cv-text preview-sec-title">{generalInfo.title}</h3>
                    )}
                    </div>
                    <div className="personal-info-1">
                    <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader }} className="cv-text preview-headings">PERSONAL INFO</h3>

                    
                    {generalInfo.email && (
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">
                            <MdEmail className="icon" /> {generalInfo.email}
                        </p>
                    )}
                    {generalInfo.phone && (
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">
                            <FaPhone className="icon" /> {generalInfo.phone}
                        </p>
                    )}
                    {generalInfo.location && (
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text" >
                            <FaLocationArrow className="icon" /> {generalInfo.location}
                        </p>
                    )}
                    {generalInfo.github && (
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text" >
                            <FaGithub className="icon" /><a href={generalInfo.github} target="_blank" rel="noopener noreferrer">{generalInfo.github}</a>
                        </p>
                    )}
                    {generalInfo.linkedin && (
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text" >
                            <FaLinkedin className="icon" /><a href={generalInfo.linkedin} target="_blank" rel="noopener noreferrer">{generalInfo.linkedin}</a>
                        </p>
                    )}
                    {generalInfo.website && (
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">
                            <FaBriefcase className="icon" /> <a href={generalInfo.website} target="_blank" rel="noopener noreferrer">{generalInfo.website}</a>
                        </p>
                    )}
                    </div>
                </div>

                {visibleSections?.education && (
                    <div className="preview-section-education" style={{ backgroundColor: style.backgroundColorLeft, color: style.textColorLeft }}>
                        <h3 style={{ fontSize: style.fontHeaderSize, fontFamily: style.fontFamilyHeader }} className="cv-text preview-headings">EDUCATION</h3>
                        {education.length > 0 ? (
                            education.map((edu, index) => (
                                <div key={index} className="education-entry-preview">
                                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="stronger-font cv-text">{edu?.school || "Your school"}</p>
                                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">{edu?.location || "School address"}</p>
                                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">{edu?.degree || "Your degree"}</p>
                                    {edu.achievements && edu.achievements.points.length > 0 && (
                                        <div className="edu-achievements">
                                            <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="stronger-font">{edu.achievements.title}</p>
                                            <ul>
                                                {edu.achievements.points.map((point, i) => (
                                                    point && <li style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="stronger-font cv-text"  >{formatDate(edu?.startDate || "start date")} — {formatDate(edu?.endDate || "end Date")}</p>
                                </div>
                            ))
                        ) : (
                            <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>No education details added yet.</p>
                        )}
                    </div>
                )}

                {visibleSections?.skills && (
                    <div className="preview-section-skill" style={{ backgroundColor: style.backgroundColorLeft, color: style.textColorLeft }}>
                        <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader }} className="cv-text preview-headings">SKILLS</h3>
                        <ul className="skill-list-main">
                            {skills.map((skill, index) => (
                                <li key={index} className="skill-list-item cv-text" style={{ backgroundColor: style.skillTabColor, color: style.textColorSkillTab, fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{skill?.skill || "Your skill"}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {visibleSections?.hobbies && (


                    <div className="hobbies-description" style={{ backgroundColor: style.backgroundColorLeft, color: style.textColorLeft }}>
                        <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader }} className="preview-headings" >HOBBIES & INTERESTS</h3>
                        {hobbies.map((hobby, index) => (
                            <div className="hobby-entry" key={index}>
                                <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="stronger-font">{hobby.title}</p>
                                <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{hobby.description}</p>
                            </div>

                        ))}
                    </div>

                )}

                {visibleSections?.languages && (
                    <div className="language-description">
                        <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader }} className="preview-headings">LANGUAGES</h3>
                        {languages?.map((lang, index) => (
                            <div key={index} className="language-entry">
                                <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="stronger-font">{lang.language}</p>
                                <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{lang.proficiency}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className="preview-section-right" >
                {visibleSections?.summary && (
                    <div className="preview-section-summary" style={{ backgroundColor: style.backgroundColorRight, color: style.textColorRight }}>
                        <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader }} className="cv-text preview-headings">PROFILE</h3>
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">{summary?.summary || "Your summary"}</p>
                    </div>
                )}

                {visibleSections.experience && (
                    <div className="preview-section-experience" style={{ backgroundColor: style.backgroundColorRight, color: style.textColorRight }}>
                        <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader }} className="cv-text preview-headings">EMPLOYMENT HISTORY</h3>
                        {experience.length > 0 ? (
                            experience.map((exp, index) => (
                                <div key={index} className="experience-entry-preview">
                                    <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{exp?.position || "Your position"}</p>
                                    <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{exp?.company || "Your company"}</p>
                                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">{exp?.location || "Your exp"}</p>
                                    {exp.achievements && exp.achievements.points.length > 0 && (
                                        <div className="exp-achievements">
                                            <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="stronger-font">{exp.achievements.title}</p>
                                            <ul>
                                                {exp.achievements.points.map((point, i) => (
                                                    point && <li style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{formatDate(exp?.startDate || "Start date")} — {formatDate(exp?.endDate || "End date")}</p>
                                </div>
                            ))
                        ) : (
                            <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">No experience details added yet.</p>
                        )}
                    </div>
                )}
                {visibleSections.projects && (
                    <div className="preview-section-project" style={{ backgroundColor: style.backgroundColorRight, color: style.textColorRight }}>
                        <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader }} className="cv-text preview-headings">PROJECTS</h3>
                        {projects.length > 0 ? (
                            projects.map((proj, index) => (
                                <div key={index} className="project-entry-preview">
                                    <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{proj?.title || "Your project title"}</p>
                                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">{proj?.description || "Your project description"}</p>
                                    

                                    {/* Display skills used */}
                                    <div className="project-skills">
                                        <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>Skills used:</p>
                                        <ul className="skill-list-projects">
                                            {proj?.skillsUsed?.length > 0 ? (
                                                proj.skillsUsed.map((skill, i) => (
                                                    <li key={i} className="skill-item cv-text" style={{ backgroundColor: style.skillTabColor, color: style.textColorSkillTab, fontSize: style.fontContentSize, fontFamily:style.fontFamilyContent }}>{skill}</li>
                                                ))) : (
                                                <li style={{ backgroundColor: style.skillTabColor, color: style.textColorSkillTab, fontSize: style.fontContentSize, fontFamily:style.fontFamilyContent }}>no skills added</li>
                                            )
                                            }
                                        </ul>
                                    </div>

                                    {/* display key feature */}
                                    <div className="project-key-feature">
                                        <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>Key features:</p>
                                        <ul className="feature-list">
                                            {proj?.keyFeatures?.length > 0 ? (
                                                proj.keyFeatures.map((feature, i) => (
                                                    <li key={i} className="feature-item cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{feature}</li>
                                                ))) : (
                                                <li style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>No key features added</li>
                                            )}
                                        </ul>
                                    </div>
                                    <p className="stronger-font" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>
                                        <strong>Project Link :</strong>{" "}
                                        {proj.link ? (
                                            <a style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} href={proj.link} target="_blank" rel="noopener noreferrer">
                                                {proj.link}
                                            </a>
                                        ) : (
                                            "No link provided"
                                        )}
                                    </p>
                                </div>

                            ))

                        ) : (<p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} className="cv-text">No projects added yet</p>)  // added feedback
                        }
                    </div>
                )}
                {visibleSections.custom && (
                    <div>
                        <h3 style={{ fontSize: style.fontHeaderSize, fontFamily: style.fontFamilyHeader }} className="preview-headings">{custom.title}</h3>
                        {custom.type == "text" && (
                            <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{custom.description}</p>
                        )}
                        {custom.type === "list" && (
                            <ul>
                                {custom.listItems.map((item, i) => {
                                    return (
                                        <li key={i} style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>{item}</li>
                                    )
                                })}
                            </ul>
                        )}
                        {custom.type === "links" && (
                            <ul className="custom-links">
                                {custom.links.map((link, i) => (
                                    <li key={i} style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>
                                        <a style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }} href={link} target="_blank" rel="noopener noreferrer">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {custom.type === "contact" && (
                            <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent }}>
                                Phone: {custom.phone}
                                <br />
                                Email: {custom.email}
                            </p>
                        )}


                    </div>
                )}

            </div>
               
        </div>

    );
});

export default Preview;