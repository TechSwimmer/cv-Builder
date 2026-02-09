import React, { forwardRef } from "react";
import "../../styles/pdfstyles/pdfLayoutTwo.css";
import "../../styles/pdfstyles/pdfDocument.css"




const PDFLayoutTwo = forwardRef(({ generalInfo, experience, education, skills, summary, projects, hobbies, languages, custom, visibleSections }, ref) => {
  return (
   
      <div className="pdf2-page">
        {/* HEADER SECTION */}
        <div className="pdf2-header-section">
          <div className="pdf2-header-content">
            <div className="pdf2-header-left">
              <h1 className="pdf2-name">{generalInfo.name || "Full Name"}</h1>
              <div className="pdf2-title">{generalInfo.title || "Professional Title"}</div>
            </div>
            <div className="pdf2-header-right">
              <div className="pdf2-contact-info">
                {generalInfo.email && <div className="pdf2-contact-item">{generalInfo.email}</div>}
                {generalInfo.phone && <div className="pdf2-contact-item">{generalInfo.phone}</div>}
                {generalInfo.location && <div className="pdf2-contact-item">{generalInfo.location}</div>}
                {generalInfo.website && <div className="pdf2-contact-item">
                  <a href={generalInfo.website} target="_blank" rel="noopener noreferrer">{generalInfo.website}</a>
                </div>}
                {generalInfo.linkedin && <div className="pdf2-contact-item">
                  <a href={generalInfo.linkedin} target="_blank" rel="noopener noreferrer">{generalInfo.linkedin}</a>
                </div>}
                {generalInfo.github && <div className="pdf2-contact-item">
                  <a href={generalInfo.github} target="_blank" rel="noopener noreferrer">{generalInfo.github}</a>
                </div>}
              </div>
            </div>
          </div>
        </div>

        <div className="pdf2-body">
          {/* LEFT COLUMN */}
          <div className="pdf2-left">
            {/* EDUCATION */}
            {visibleSections?.education && education.length > 0 && (
              <>
                {education.map((e, i) => (
                  <div key={i} className="pdf2-block" data-col="left">

                    {i === 0 && (
                      <div className="pdf2-section-head">
                        <h2>Education</h2>
                      </div>
                    )}

                    <div className="pdf2-education-item">
                      <div className="pdf2-edu-degree">{e.degree}</div>
                      <div className="pdf2-edu-school">{e.school}</div>
                      <div className="pdf2-edu-dates">
                        {e.startDate} – {e.endDate || 'Present'}
                      </div>

                      {e.location && <div className="pdf2-edu-location">{e.location}</div>}

                      {e.achievements?.points?.length > 0 && (
                        <div className="pdf2-edu-achievements">
                          <div className="pdf2-achievement-title">{e.achievements.title}</div>
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

            {/* LANGUAGES */}
            {visibleSections?.languages && languages.length > 0 && (
              <>
                {languages.map((lang, i) => (
                  <div key={i} className="pdf2-block" data-col="left">

                    {i === 0 && (
                      <div className="pdf2-section-head">
                        <h2>Languages</h2>
                      </div>
                    )}

                    <div className="pdf2-language-item">
                      <div className="pdf2-language-name">{lang.language}</div>
                      <div className="pdf2-language-level">{lang.proficiency}</div>
                    </div>

                  </div>
                ))}
              </>
            )}

            {/* HOBBIES */}
            {visibleSections?.hobbies && hobbies.length > 0 && (
              <>
                {hobbies.map((hobby, i) => (
                  <div key={i} className="pdf2-block" data-col="left">

                    {i === 0 && (
                      <div className="pdf2-section-head">
                        <h2>Interests</h2>
                      </div>
                    )}

                    <div className="pdf2-hobby-item">
                      <div className="pdf2-hobby-title">{hobby.title}</div>
                      <div className="pdf2-hobby-desc">{hobby.description}</div>
                    </div>

                  </div>
                ))}
              </>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="pdf2-right">
            {/* PROFILE SUMMARY */}
            {visibleSections?.summary && summary?.summary && (
              <div className="pdf2-block" data-col="right">

                <div className="pdf2-section-head">
                  <h2>Professional Summary</h2>
                </div>

                <div className="pdf2-summary-content">
                  <p>{summary.summary}</p>
                </div>

              </div>
            )}

            {/* EXPERIENCE */}
            {visibleSections?.experience && experience.length > 0 && (
              <>
                {experience.map((e, i) => (
                  <div key={i} className="pdf2-block" data-col="right">

                    {i === 0 && (
                      <div className="pdf2-section-head">
                        <h2>Experience</h2>
                      </div>
                    )}

                    <div className="pdf2-experience-item">
                      <div className="pdf2-exp-header">
                        <div className="pdf2-exp-title">
                          <strong>{e.position}</strong>
                          <span className="pdf2-exp-company"> – {e.company}</span>
                        </div>
                        <div className="pdf2-exp-dates">
                          {e.startDate} – {e.endDate || "Present"}
                        </div>
                      </div>
                      {e.location && (
                        <div className="pdf2-exp-location">{e.location}</div>
                      )}

                      {e.achievements?.points?.length > 0 && (
                        <div className="pdf2-exp-achievements">
                          <ul>
                            {e.achievements.points.map((point, idx) => (
                              point && <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </>
            )}

            {/* PROJECTS */}
            {visibleSections?.projects && projects.length > 0 && (
              <>
                {projects.map((proj, index) => (
                  <div key={index} className="pdf2-block" data-col="right">

                    {index === 0 && (
                      <div className="pdf2-section-head">
                        <h2>Projects</h2>
                      </div>
                    )}
                    <div key={index} className="pdf2-project-item">
                      <div className="pdf2-project-header">
                        <div className="pdf2-project-title">{proj.title}</div>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="pdf2-project-link">
                            {proj.link}
                          </a>
                        )}
                      </div>
                      {proj.description && (
                        <p className="pdf2-project-desc">{proj.description}</p>
                      )}
                      {proj.skillsUsed.length > 0 && (
                        <div className="pdf2-project-skills">
                          <strong>Technologies:</strong>
                          <div className="pdf2-skills-tags">
                            {proj.skillsUsed.map((skill, i) => (
                              <span key={i} className="pdf2-skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {proj.keyFeatures.length > 0 && (
                        <div className="pdf2-project-features">
                          <strong>Key Features:</strong>
                          <ul>
                            {proj.keyFeatures.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>


                  </div>

                ))

                }



              </>



            )}

            {/* SKILLS */}
            {visibleSections?.skills && skills.length > 0 && (
              <div className="pdf2-block" data-col="right">

                <div className="pdf2-section-head">
                  <h2>Skills</h2>
                </div>

                <div className="pdf2-skills-grid">
                  {skills.map((s, i) => (
                    <span key={i} className="pdf2-skill-item">
                      {s.skill}
                    </span>
                  ))}
                </div>

              </div>
            )}

            {/* CUSTOM SECTION */}
            {visibleSections?.custom && custom && (
              <div className="pdf2-section" data-col="right">
                <h2>{custom.title}</h2>
                {custom.type === "text" && <p>{custom.description}</p>}
                {custom.type === "list" && (
                  <ul>
                    {custom.listItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {custom.type === "links" && (
                  <ul className="pdf2-custom-links">
                    {custom.links.map((link, i) => (
                      <li key={i}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {custom.type === "contact" && (
                  <div className="pdf2-custom-contact">
                    <div><strong>Phone:</strong> {custom.phone}</div>
                    <div><strong>Email:</strong> {custom.email}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
  );
});

export default PDFLayoutTwo;