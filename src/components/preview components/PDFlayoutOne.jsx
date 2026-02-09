import React, { forwardRef } from "react";
import "../../styles/pdfstyles/PdfLayoutOne.css";


const PDFLayoutOne = ((props = {}) => {
  const {
    generalInfo = {},
    summary = {},
    experience = [],
    education = [],
    skills = [],
    
    projects = [],
    languages = [],
    hobbies = [],
    custom,
    visibleSections = {},
  } = props;

  return (
   
      <div className="pdf1-page">
        <div className="pdf1-body">
          {/* LEFT COLUMN - SIDEBAR */}
          <div className="pdf1-left">
            {/* General Info */}
            <div className="pdf1-section pdf1-general" data-col="left" data-fixed>
              {generalInfo?.name && <h3 data-pdf-text="name">{generalInfo.name}</h3>}
              {generalInfo?.title && <p data-pdf-text="title" style={{ color: "#3498db", fontWeight: "600", fontSize: "14px",borderBottom: "1px solid #ccc" }}>{generalInfo.title}</p>}
              {generalInfo?.email && <a data-pdf-link={`mailto:${generalInfo.email}`} href={`mailto:${generalInfo.email}`}>{generalInfo.email}</a>}
              {generalInfo?.phone && <p data-pdf-text="phone">{generalInfo.phone}</p>}
              {generalInfo?.location && <p data-pdf-text="location">{generalInfo.location}</p>}
              {generalInfo?.website && <div><a data-pdf-link={generalInfo.website} href={generalInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>{generalInfo.website}</a></div>}
              {generalInfo?.linkedin && <div><a data-pdf-link={generalInfo.linkedin} href={generalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>{generalInfo.linkedin}</a></div>}
              {generalInfo?.github && <div><a data-pdf-link={generalInfo.github} href={generalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>{generalInfo.github}</a></div>}
            </div>

            {/* Education */}
            {visibleSections?.education && education.length > 0 && (
              <>
                {education.map((e, i) => (
                  <div key={i} className="pdf1-block" data-col="left">

                    {i === 0 && <h3 data-pdf-text="section-heading" className="section-heading">Education</h3>}

                    <div className="edu-item">
                      <strong>{e.degree}</strong>
                      <strong>{e.school}</strong>
                      
                      <div className="pdf1-text">{e.startDate} - {e.endDate || "Current"}</div>
                      {e.location && <p className="pdf1-edu-location">{e.location}</p>}

                      {e.achievements?.points?.length > 0 && (
                        <div className="edu-achievements">
                          <strong>{e.achievements.title}</strong>
                          <ul>
                            {e.achievements.points.map((p, j) => p && <li key={j}>{p}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </>
            )}


            {/* Languages */}
            {visibleSections?.languages && languages.length > 0 && (
              <div className="pdf1-section" data-col="left">
                <h3 data-pdf-text="section-heading" className="section-heading">Languages</h3>
                {languages.map((lang, index) => (
                  <div key={index} className="language-item">
                    <strong>{lang.language}</strong>
                    <p>{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Hobbies */}
            {visibleSections?.hobbies && hobbies.length > 0 && (
              <div className="pdf1-section" data-col="left">
                <h3 data-pdf-text="section-heading" className="section-heading">Hobbies & Interests</h3>
                {hobbies.map((hobby, index) => (
                  <div key={index} className="hobby-item">
                    <strong>{hobby.title}</strong>
                    <p>{hobby.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - MAIN CONTENT */}
          <div className="pdf1-right">
            {/* Profile Summary */}
            {visibleSections?.summary && summary?.summary && (
              <div className="pdf1-block" data-col="right">

                <h3 data-pdf-text="section-heading" className="section-heading">Professional Summary</h3>

                <p>{summary.summary}</p>

              </div>
            )}

            {/* Experience */}
            {visibleSections?.experience && experience.length > 0 && (
              <>
                {experience.map((e, i) => (
                  <div key={i} className="pdf1-block" data-col="right">

                    {i === 0 && <h3 data-pdf-text="section-heading" className="section-heading">Work Experience</h3>}

                    <div className="exp-item">
                      <strong>{e.position} – {e.company}</strong>
                      <div className="pdf1-text">{e.startDate} - {e.endDate || "Current"}</div>
                      {e.location && (
                        <div className="pdf1-exp-location">{e.location}</div>
                      )}

                      {e.achievements?.points?.length > 0 && (
                        <div className="exp-achievements">
                          <strong>{e.achievements.title}</strong>
                          <ul>
                            {e.achievements.points.map((p, j) => p && <li key={j}>{p}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </>
            )}

            {/* Projects */}
            {visibleSections?.projects && projects.length > 0 && (
              <>
                {projects.map((proj, index) => (
                  <div key={index} className="pdf1-block" data-col="right">

                    {index === 0 && <h3 data-pdf-text="section-heading" className="section-heading">Projects</h3>}

                    <div className="project-item">
                      <strong>{proj.title}</strong>

                      {proj.link && (
                        <a data-pdf-link={proj.link} href={proj.link} target="_blank" rel="noopener noreferrer" className="pdf1-project-link">
                          {proj.link}
                        </a>
                      )}

                      {proj.description && <p>{proj.description}</p>}

                      {proj.skillsUsed?.length > 0 && (
                        <div className="project-skills">
                          <strong>Technologies Used:</strong>
                          <div>
                            {proj.skillsUsed.map((skill, i) => (
                              <span key={i} className="pdf1-skill">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {proj.keyFeatures?.length > 0 && (
                        <div className="project-key-feature">
                          <strong>Key Features:</strong>
                          <ul className="feature-list">
                            {proj.keyFeatures.map((feature, i) => (
                              
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}


                    </div>

                  </div>
                ))}
              </>
            )}


            {/* Skills */}
           {visibleSections?.skills && skills.length > 0 && (
              <div className="pdf1-block" data-col="right">

                <div className="section-heading">
                  <h2>Skills</h2>
                </div>

                <div className="pdf1-skills-grid">
                  {skills.map((s, i) => (
                    <span key={i} className="pdf2-skill-item">
                      {s.skill}
                    </span>
                  ))}
                </div>

              </div>
            )}

            {/* Custom Section */}
            {visibleSections?.custom && custom && (
              <div className="pdf1-block" data-col="right">

                <h3 data-pdf-text="section-heading" className="section-heading">{custom.title}</h3>

                {custom.type === "text" && <p>{custom.description}</p>}

                {custom.type === "list" && (
                  <ul>
                    {custom.listItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {custom.type === "links" && (
                  <ul className="custom-links">
                    {custom.links.map((link, i) => (
                      <li key={i}>
                        <a data-pdf-link={custom.link} href={custom.link} target="_blank" rel="noopener noreferrer">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {custom.type === "contact" && (
                  <p>
                    <strong>Phone:</strong> {custom.phone}<br />
                    <strong>Email:</strong> {custom.email}
                  </p>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    
  );
});


export default PDFLayoutOne;