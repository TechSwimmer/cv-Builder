import React, { forwardRef } from "react";
import { FaGithub, FaLinkedin, FaPhone, FaLocationArrow, FaBriefcase } from "react-icons/fa";
import { MdEmail } from "react-icons/md"


const PreviewTwo = forwardRef((props, ref) => {
  const { style } = props;
  
  const { generalInfo, education, experience, summary, skills, visibleSections, projects, hobbies, languages, custom } = props;

  const formatDate = (dateString) => {
    if (!dateString) return "Present";  // Default for empty values
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Prevents crashes
    return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
  };


  return (
    <div className="cv-2-preview" id="cv-2-preview" style={{ fontSize: style.fontSize }} ref={ref} >
      <div className="cv-2-content">
        <div className="cv-2-header" style={{backgroundColor: style.backgroundColorContent}}>
          <div className="cv-2-name">
            {generalInfo.name && <h1 style={{ fontSize: style.fontNameSize,fontFamily: style.fontFamilyHeader, color: style.textColorHeader, backgroundColor: style.backgroundColorHeader }}>{generalInfo.name}</h1>}
            {generalInfo.title && <h3  style={{ fontSize: style.fontHeaderSize, fontFamily: style.fontFamilyHeader, color: style.textColorHeader,backgroundColor: style.backgroundColorHeader }}>{generalInfo.title}</h3>}
          </div>
          <div className="cv-2-contact">
            {generalInfo.email && <p style={{ fontSize: style.fontSize, color: style.textColorContent,fontFamily: style.fontFamilyContent, backgroundColor: style.backgroundColorContent }}><MdEmail /> {generalInfo.email}</p>}
            {generalInfo.phone && <p style={{ fontSize: style.fontSize, color: style.textColorContent,fontFamily: style.fontFamilyContent, backgroundColor: style.backgroundColorContent  }}><FaPhone /> {generalInfo.phone}</p>}
            {generalInfo.location && <p style={{ fontSize: style.fontSize, color: style.textColorContent,fontFamily: style.fontFamilyContent, backgroundColor: style.backgroundColorContent  }}><FaLocationArrow /> {generalInfo.location}</p>}
            {generalInfo.github && <p style={{ fontSize: style.fontSize, color: style.textColorContent,fontFamily: style.fontFamilyContent, backgroundColor: style.backgroundColorContent  }}><FaGithub /> {generalInfo.github}</p>}
            {generalInfo.linkedin && <p style={{ fontSize: style.fontSize, color: style.textColorContent,fontFamily: style.fontFamilyContent, backgroundColor: style.backgroundColorContent}}><FaLinkedin /> {generalInfo.linkedin}</p>}
            {generalInfo.website && <p style={{ fontSize: style.fontSize, color: style.textColorContent,fontFamily: style.fontFamilyContent, backgroundColor: style.backgroundColorContent  }}><FaBriefcase /> {generalInfo.website}</p>}
          </div>
        </div>
        <div className="cv-2-body">
          <div className="cv-2-profile">
            {visibleSections?.summary && (
              <div className="preview-section-summary-2" >
                <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader, color: style.textColorHeader,backgroundColor: style.backgroundColorHeader }} className="cv-text preview-headings-2">PROFILE</h3>
                <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }} className="cv-text preview-content-2">{summary?.summary || "Your summary"}</p>
              </div>
            )}
          </div>
          <div className="cv-2-experience" >
            {visibleSections?.experience && (
              <div className="preview-section-experience-2" >
                <h3 style={{ fontSize: style.fontHeaderSize, fontFamily: style.fontFamilyHeader, color: style.textColorHeader,backgroundColor: style.backgroundColorHeader }} className="cv-text preview-headings-2">EMPLOYMENT HISTORY</h3>
                <div className="preview-section-experience-2-content">
                {experience.length > 0 ? (
                  experience.map((exp, index) => (
                    <div key={index} className="experience-entry-preview-2"  style={{ backgroundColor: style.backgroundColorContent}}>
                      <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent }}> {`${exp?.position || "Your position"}, ${exp?.company || "Your company"}`}</p>
                      <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent }}><span>{exp?.location || "Your exp"}</span></p>
                      {exp.achievements && exp.achievements.points.length > 0 && (
                        <div className="exp-achievements-2">
                          <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }} className="stronger-font">{exp.achievements.title}</p>
                          <ul>
                            {exp.achievements.points.map((point, i) => (
                              point && <li style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }} key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent,color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>{formatDate(exp?.startDate || "Start date")} — {formatDate(exp?.endDate || "End date")}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }} className="cv-text">No experience details added yet.</p>
                )}
                </div>
              </div>
            )}
          </div>

          <div className="cv-2-education">
            {visibleSections.education && (
              <div className="preview-section-education-2" >
                <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader, backgroundColor: style.backgroundColorHeader, color: style.textColorHeader }} className="cv-text preview-headings-2">EDUCATION</h3>
                {education.length > 0 ? (
                  education.map((edu, index) => (
                    <div key={index} className="education-entry-preview-2" style={{backgroundColor: style.backgroundColorContent }} >
                      <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent }} className="stronger-font cv-text">{`${edu?.school || "Your school"},${edu?.degree || "Your degree"} `}</p>
                      <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent}} className="cv-text">{edu?.location || "School address"}</p>

                      {edu.achievements && edu.achievements.points.length > 0 && (
                        <div className="edu-achievements-2">
                          <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color:style.textColorContent, backgroundColor: style.backgroundColorContent }} className="stronger-font">{edu.achievements.title}</p>
                          <ul>
                            {edu.achievements.points.map((point, i) => (
                              point && <li style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }} key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent,color: style.textColorContent, backgroundColor: style.backgroundColorContent }} className="stronger-font cv-text"  >{formatDate(edu?.startDate || "start date")} — {formatDate(edu?.endDate || "end Date")}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }} className="cv-text">No education details added yet.</p>)}
              </div>
            )}
          </div>
          <div className="cv-2-projects">
            {visibleSections?.projects && (
              <div className="preview-section-project" >
                <h3 style={{ fontSize: style.fontHeaderSize, fontFamily: style.fontFamilyHeader, backgroundColor: style.backgroundColorHeader, color: style.textColorHeader }} className="cv-text preview-headings-2">PROJECTS</h3>
                {projects.length > 0 ? (
                  projects.map((proj, index) => {
                    return (
                      <div key={index} className="project-entry-preview-2" style={{backgroundColor: style.backgroundColorContent}}>
                        <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent,color: style.textColorContent }}>{proj?.title || "Your project title"}</p>
                        <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent,color: style.textColorContent}} className="cv-text">{proj?.description || "Your project description"}</p>


                        {/* Display skills used */}
                        <div className="project-skills">
                          <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>Skills used:</p>
                          <ul className="skill-list-projects">
                            {proj?.skillsUsed?.length > 0 ? (
                              proj.skillsUsed.map((skill, i) => (
                                <li key={i} className="skill-item cv-text" style={{ backgroundColor: style.skillTabColor, color: style.textColorSkillTab, fontSize: style.fontContentSize,fontFamily: style.fontFamilyContent }}>{skill}</li>
                              ))) : (
                              <li style={{ backgroundColor: style.skillTabColor, color: style.textColorSkillTab, fontSize: style.fontContentSize,fontFamily: style.fontFamilyContent }}>no skills added</li>
                            )}
                          </ul>
                        </div>

                        {/* display key feature */}
                        <div className="project-key-feature">
                          <p className="stronger-font cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent,color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>Key features:</p>
                          <ul className="feature-list">
                            {proj?.keyFeatures?.length > 0 ? (
                              proj.keyFeatures.map((feature, i) => (
                                <li key={i} className="feature-item cv-text" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent,color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>{feature}</li>
                              ))) : (
                              <li  style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>No key features added</li>
                            )}
                          </ul>
                        </div>
                        <p className="stronger-font" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>
                          <strong>Project Link :</strong>{" "}
                          {proj.link ? (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>
                              {proj.link}
                            </a>
                          ) : (
                            "No link provided"
                          )}
                        </p>
                      </div>

                    );
                  })

                ) : (<p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }} className="cv-text">No projects added yet</p>)  // added feedback
                }
              </div>
            )}
          </div>
          <div className="cv-2-skills">
            {visibleSections?.skills && (
              <div className="preview-section-skill" >
                <h3 style={{ fontSize: style.fontHeaderSize, fontFamily: style.fontFamilyHeader, color: style.textColorHeader,backgroundColor:style.backgroundColorHeader }} className="cv-text preview-headings-2">SKILLS</h3>
                <ul className="skill-list-main-2" style={{backgroundColor: style.backgroundColorContent}}>
                  {skills.map((skill, index) => (
                    <li key={index} className="skill-list-item-2 cv-text" style={{ backgroundColor: style.skillTabColor, color: style.textColorSkillTab, fontSize: style.fontContentSize,fontFamily: style.fontFamilyContent }}>{skill?.skill || "Your skill"}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>



          {visibleSections.custom && (
            <div>
              <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader, backgroundColor: style.backgroundColorHeader, color: style.textColorHeader }} >{custom.title}</h3>
              <div>
              {custom.type == "text" && (
                <p className="custom-description-2" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>{custom.description}</p>
              )}
              {custom.type === "list" && (
                <ul className="custom-links-2" style={ {backgroundColor: style.backgroundColorContent}}>
                  {custom.listItems.map((item, i) => {
                    return (
                      <li key={i} style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent,color: style.textColorContent }}>{item}</li>
                    )
                  })}
                </ul>
              )}
              {custom.type === "links" && (
                <ul className="custom-links-2" style={{ backgroundColor: style.backgroundColorContent}}>
                  {custom.links.map((link, i) => (
                    <li key={i} style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>
                      <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {custom.type === "contact" && (
                <div className="custom-contact-2" style={{ backgroundColor: style.backgroundColorContent}}>
                <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent, backgroundColor: style.backgroundColorContent }}>
                  Phone: {custom.phone}
                  <br />
                  Email: {custom.email}
                </p>
                </div>
              )}
              </div>


            </div>
          )}
          <div className="language-hobby-2">
            {visibleSections?.languages && (
              <div className="language-description-2">
                <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader, color: style.textColorHeader,backgroundColor: style.backgroundColorHeader }} className="preview-headings-2">LANGUAGES</h3>
                {languages?.map((lang, index) => (
                  <div key={index} className="language-entry-2" style={{backgroundColor: style.backgroundColorContent}}>
                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent }} className="stronger-font">{lang.language}</p>
                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, color: style.textColorContent }}>{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            )}
            {visibleSections?.hobbies && (


              <div className="hobbies-description-2" >
                <h3 style={{ fontSize: style.fontHeaderSize,fontFamily: style.fontFamilyHeader, backgroundColor: style.backgroundColorHeader , color: style.textColorHeader }} className="preview-headings-2" >HOBBIES & INTERESTS</h3>
                {hobbies.map((hobby, index) => (
                  <div className="hobby-entry-2" style={{backgroundColor: style.backgroundColorContent }}  key={index}>
                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent,style: style.textColorContent, backgroundColor: style.backgroundColorContent  }} className="stronger-font" >{hobby.title}</p>
                  
                    <p style={{ fontSize: style.fontContentSize, fontFamily: style.fontFamilyContent, style: style.textColorContent, backgroundColor: style.backgroundColorContent }}>{hobby.description}</p>
                  </div>

                ))}
              </div>
            
            )}
          
          </div>
        </div>
      </div>
    </div>
  )
});

export default PreviewTwo;