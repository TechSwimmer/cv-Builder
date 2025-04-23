// Layout 3 Preview.jsx
import React, { useEffect, forwardRef, useState } from "react";
import { FaGithub, FaLinkedin, FaPhone, FaLocationArrow, FaBriefcase } from "react-icons/fa";
import { MdEmail } from "react-icons/md"



const PreviewThree = forwardRef((props, ref) => {



  const { style } = props;
  const { visibleSections, setVisibleSections } = props;
  const { generalInfo, education, experience, summary, skills, className, projects, hobbies, languages, custom, currentLayout, handleLayoutClick, customStyles, updateStyles } = props;

  const formatDate = (dateString) => {
    if (!dateString) return "Present";  // Default for empty values
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Prevents crashes
    return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
  };

  return (
    <>
      <div className="cv-3-header">
        {generalInfo.name && <h1 >{generalInfo.name}</h1>}
        {generalInfo.title && <h3 style={{ fontSize: style.fontContentSize }}>{generalInfo.title}</h3>}
      </div>
      <div className="cv-preview-3">
        <div className="cv-3-left">
          <div className="cv-3-profile">
            {visibleSections?.summary && (
              <div className="preview-section-summary" style={{ color: style.textColorRight }}>
                <h3 style={{ fontSize: style.fontHeaderSize }} className="cv-text preview-headings">PROFILE</h3>
                <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="cv-text">{summary?.summary || "Your summary"}</p>
              </div>
            )}
          </div>
          <div className="cv-3-experience">
            {visibleSections?.experience && (
              <div className="preview-section-experience-2" style={{ color: style.textColorRight }}>
                <h3 style={{ fontSize: style.fontHeaderSize }} className="cv-text preview-headings">EMPLOYMENT HISTORY</h3>
                {experience.length > 0 ? (
                  experience.map((exp, index) => (
                    <div key={index} className="experience-entry-preview-3">
                      <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}> {`${exp?.position || "Your position"}, ${exp?.company || "Your company"}`}</p>
                      <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}><span>{exp?.location || "Your exp"}</span></p>
                      {exp.achievements && exp.achievements.points.length > 0 && (
                        <div className="exp-achievements-3">
                          <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="stronger-font">{exp.achievements.title}</p>
                          <ul>
                            {exp.achievements.points.map((point, i) => (
                              point && <li style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>{formatDate(exp?.startDate || "Start date")} — {formatDate(exp?.endDate || "End date")}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="cv-text">No experience details added yet.</p>
                )}
              </div>
            )}
          </div>
          <div className="cv-3-education">
            {visibleSections.education && (
              <div className="preview-section-education-3" style={{ color: style.textColorLeft }}>
                <h3 style={{ fontSize: style.fontHeaderSize }} className="cv-text preview-headings">EDUCATION</h3>
                {education.length > 0 ? (
                  education.map((edu, index) => (
                    <div key={index} className="education-entry-preview-3">
                      <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="stronger-font cv-text">{`${edu?.school || "Your school"},${edu?.degree || "Your degree"} `}</p>
                      <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="cv-text">{edu?.location || "School address"}</p>

                      {edu.achievements && edu.achievements.points.length > 0 && (
                        <div className="edu-achievements-3">
                          <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="stronger-font">{edu.achievements.title}</p>
                          <ul>
                            {edu.achievements.points.map((point, i) => (
                              point && <li style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="stronger-font cv-text"  >{formatDate(edu?.startDate || "start date")} — {formatDate(edu?.endDate || "end Date")}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>No education details added yet.</p>
                )}
              </div>
            )}
          </div>

          <div className="cv-3-projects">
            {visibleSections?.projects && (
              <div className="preview-section-project" style={{ color: style.textColorRight }}>
                <h3 style={{ fontSize: style.fontHeaderSize }} className="cv-text preview-headings">PROJECTS</h3>
                {projects.length > 0 ? (
                  projects.map((proj, index) => {
                    return (
                      <div key={index} className="project-entry-preview-3">
                        <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>{proj?.title || "Your project title"}</p>
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="cv-text">{proj?.description || "Your project description"}</p>


                        {/* Display skills used */}
                        <div className="project-skills">
                          <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>Skills used:</p>
                          <ul className="skill-list-projects">
                            {proj?.skillsUsed?.length > 0 ? (
                              proj.skillsUsed.map((skill, i) => (
                                <li key={i} className="skill-item cv-text" style={{ backgroundColor: style.skillTabColor, color: style.textColorSkillTab, fontSize: style.fontContentSize }}>{skill}</li>
                              ))) : (
                              <li>no skills added</li>
                            )}
                          </ul>
                        </div>

                        {/* display key feature */}
                        <div className="project-key-feature">
                          <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>Key features:</p>
                          <ul className="feature-list">
                            {proj?.keyFeatures?.length > 0 ? (
                              proj.keyFeatures.map((feature, i) => (
                                <li key={i} className="feature-item cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>{feature}</li>
                              ))) : (
                              <li>No key features added</li>
                            )}
                          </ul>
                        </div>
                        <p className="stronger-font" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>
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

                    );
                  })

                ) : (<p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="cv-text">No projects added yet</p>)  // added feedback
                }
              </div>
            )}
          </div>
          {visibleSections?.hobbies && (


            <div className="hobbies-description-3" style={{ color: style.textColorLeft }}>
              <h3 style={{ fontSize: style.fontHeaderSize }} className="preview-headings" >HOBBIES & INTERESTS</h3>
              {hobbies.map((hobby, index) => (
                <div className="hobby-entry-3" key={index}>
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="stronger-font">{hobby.title}</p>
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>{hobby.description}</p>
                </div>

              ))}
            </div>

          )}
        </div>
        <div className="cv-3-right">

          <div className="personal-info-3">

            <div className="cv-3-contact">
              <h3 style={{ fontSize: style.fontHeaderSize }} className="cv-text preview-headings">PERSONAL INFO</h3>
              {generalInfo.email && <p style={{ fontSize: style.fontSize, color: style.color }}><MdEmail /> {generalInfo.email}</p>}
              {generalInfo.phone && <p style={{ fontSize: style.fontSize, color: style.color }}><FaPhone /> {generalInfo.phone}</p>}
              {generalInfo.location && <p style={{ fontSize: style.fontSize, color: style.color }}><FaLocationArrow /> {generalInfo.location}</p>}
              {generalInfo.github && <p style={{ fontSize: style.fontSize, color: style.color }}><FaGithub /> {generalInfo.github}</p>}
              {generalInfo.linkedin && <p style={{ fontSize: style.fontSize, color: style.color }}><FaLinkedin /> {generalInfo.linkedin}</p>}
              {generalInfo.website && <p style={{ fontSize: style.fontSize, color: style.color }}><FaBriefcase /> {generalInfo.website}</p>}
            </div>
          </div>

          <div className="cv-3-skills">
            {visibleSections?.skills && (
              <div className="preview-section-skill" style={{ color: style.textColorLeft }}>
                <h3 style={{ fontSize: style.fontHeaderSize }} className="cv-text preview-headings">SKILLS</h3>
                <ul className="skill-list-main-3">
                  {skills.map((skill, index) => (
                    <li key={index} className="skill-list-item-3 cv-text" style={{ backgroundColor: style.skillTabColor, color: style.textColorSkillTab, fontSize: style.fontContentSize }}>{skill?.skill || "Your skill"}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {visibleSections?.languages && (
            <div className="language-description-3">
              <h3 style={{ fontSize: style.fontHeaderSize }} className="preview-headings">LANGUAGES</h3>
              {languages?.map((lang, index) => (
                <div key={index} className="language-entry-3">
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="stronger-font">{lang.language}</p>
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>{lang.proficiency}</p>
                </div>
              ))}
            </div>
          )}

          {visibleSections?.hobbies && (


            <div className="hobbies-description-3" style={{ color: style.textColorLeft }}>
              <h3 style={{ fontSize: style.fontHeaderSize }} className="preview-headings" >HOBBIES & INTERESTS</h3>
              {hobbies.map((hobby, index) => (
                <div className="hobby-entry-3" key={index}>
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }} className="stronger-font">{hobby.title}</p>
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamily }}>{hobby.description}</p>
                </div>

              ))}
            </div>

          )}

        </div>
      </div>
    </>
  );
});

export default PreviewThree;