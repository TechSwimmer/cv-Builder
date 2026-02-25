import React from "react";
import "../../styles/pdfstyles/pdfLayoutThree.css";




const PDFLayoutThree = (({ generalInfo, summary, experience, education, skills, projects, hobbies, languages, custom, visibleSections, style = {} }) => {

   const ui = {
    fontFamily: style.fontFamily || "Georgia",
    fontSize: `${style.baseFontSize || 11}px`,
    headingColor: style.headingColor || "#1f2937",
    textColor: style.textColor || "#374151",
    accentColor: style.accentColor || "#2563eb",
    pageBg: style.pageBg || "#ffffff",
    skillBox: style.skillBox || "#2563eb",
    skillTextColor:style.skillTextColor || "#ffffff"
  } 


  return (

   
  
    <div className="pdf3-page" style={{ fontFamily: ui.fontFamily, fontSize: ui.fontSize, color: ui.textColor, backgroundColor: ui.pageBg }}>
       {/* HEADER SECTION */ }
      <div className="pdf3-section pdf3-header" data-block>
        <h1 className="pdf3-name" style={{ color: ui.headingColor }}>{generalInfo.name || "Full Name"}</h1>
        <div className="pdf3-title" style={{ color: ui.accentColor }}>{generalInfo.title || "Professional Title"}</div>
        <div className="pdf3-contact">
          {generalInfo.email && <span>{generalInfo.email}</span>}
          {generalInfo.email && generalInfo.phone && <span>•</span>}
          {generalInfo.phone && <span>{generalInfo.phone}</span>}
          {generalInfo.location && generalInfo.phone && <span>•</span>}
          {generalInfo.location && <span>{generalInfo.location}</span>}
          <br />
          {generalInfo.website && <span style={{ color: ui.accentColor }}>{generalInfo.website}</span>}
          {generalInfo.website && generalInfo.linkedin && <span style={{ color: ui.accentColor }}>•</span>}
          {generalInfo.linkedin && <span style={{ color: ui.accentColor }}>{generalInfo.linkedin}</span>}
          {generalInfo.github && generalInfo.linkedin && <span style={{ color: ui.accentColor }}>•</span>}
          {generalInfo.github && <span style={{ color: ui.accentColor }}>{generalInfo.github}</span>}
        </div>
      </div>

      {/* PROFILE SUMMARY */}
      {
        visibleSections?.summary && summary?.summary && (
          <div className="pdf3-section pdf3-summary" data-block>
            <h2 style={{ color: ui.headingColor }}>Professional Profile</h2>
            <div className="pdf3-summary-content">
              <p>{summary.summary}</p>
            </div>
          </div>
        )
      }

      {/* WORK EXPERIENCE */}
      {
        visibleSections?.experience && experience.length > 0 && (
          <div className="pdf3-section pdf3-experience" data-block>
            <h2 style={{ color: ui.headingColor }}>Work Experience</h2>
            <div className="pdf3-experience-list">
              {experience.map((e, i) => (
                <div key={i} className="pdf3-experience-item">
                  <div className="pdf3-exp-header">
                    <div className="pdf3-exp-title">
                      <strong>{e.position}</strong>
                      <span className="pdf3-exp-company"> – {e.company}</span>
                    </div>
                    <div className="pdf3-exp-dates">
                      {e.startDate} – {e.endDate || "Present"}
                    </div>
                    {e.location && (
                      <div className="pdf3-exp-location">{e.location}</div>
                    )}
                    
                  </div>
                  {e.achievements && e.achievements.points.length > 0 && (
                    <div className="pdf3-exp-achievements">
                      <ul>
                        {e.achievements.points.map((point, i) => (
                          point && <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      }

      {/* EDUCATION */}
      {
        visibleSections?.education && education.length > 0 && (
          <div className="pdf3-section pdf3-education" data-block>
            <h2 style={{ color: ui.headingColor }}>Education</h2>
            <div className="pdf3-education-list">
              {education.map((e, i) => (
                <div key={i} className="pdf3-education-item">
                  <div className="pdf3-edu-header">
                    <div className="pdf3-edu-title">
                      <strong className="pdf3-edu-degree">{e.degree}</strong>
                      <strong className="pdf3-edu-school"> – {e.school}</strong>
                    </div>

                  </div>
                  <div className="pdf3-edu-dates">
                    {e.startDate} – {e.endDate || "Present"}
                  </div>
                  {e.location && (
                    <div className="pdf3-edu-location">{e.location}</div>
                  )}
                 
                  {e.achievements && e.achievements.points.length > 0 && (
                    <div className="pdf3-edu-achievements">
                      <ul>
                        {e.achievements.points.map((point, i) => (
                          point && <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      }

      {/* PROJECTS */}
      {
        visibleSections?.projects && projects.length > 0 && (
          <div className="pdf3-section pdf3-projects" data-block>
            <h2 style={{ color: ui.headingColor }}>Projects</h2>
            <div className="pdf3-projects-list">
              {projects.map((proj, index) => (
                <div key={index} className="pdf3-project-item">
                  <div className="pdf3-project-header">
                    <strong>{proj.title || "Project Title"}</strong>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="pdf3-project-link" style={{ color: ui.accentColor }}>
                        {proj.link}
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="pdf3-project-description">{proj.description}</p>
                  )}
                  {proj.skillsUsed?.length > 0 && (
                    <div className="pdf3-project-skills">
                      <strong>Technologies:</strong>
                      <div className="pdf3-skills-list">
                        {proj.skillsUsed.map((skill, i) => (
                          <span key={i} className="pdf3-skill-tag" style={{ backgroundColor: ui.accentColor, color: ui.skillTextColor}}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {proj.keyFeatures?.points?.length > 0 && (
                    <div className="pdf3-project-features">
                      <strong>{proj?.keyFeatures?.title?.trim()}</strong>
                      <ul>
                        {proj?.keyFeatures?.points.map((feature, i) => (
                         feature && <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      }

      {/* SKILLS */}
      {
        visibleSections?.skills && skills.length > 0 && (
          <div className="pdf3-section pdf3-skills" data-block>
            <h2 style={{ color: ui.headingColor }}>Skills</h2>
            <div className="pdf3-skills-grid">
              {skills.map((s, i) => (
                <span key={i} className="pdf3-skill-item" style={{ backgroundColor: ui.skillBox, color: ui.skillTextColor }}>{s.skill}</span>
              ))}
            </div>
          </div>
        )
      }

      {/* HOBBIES & LANGUAGES - Side by side */}
      {
        (visibleSections?.hobbies || visibleSections?.languages) && (
          <div className="pdf3-section pdf3-hobby-language" data-block>
            <div className="pdf3-two-column">
              {/* HOBBIES */}
              {visibleSections?.hobbies && hobbies.length > 0 && (
                <div className="pdf3-column">
                  <h3 style={{ color: ui.headingColor }}>Interests</h3>
                  <div className="pdf3-hobbies-list">
                    {hobbies.map((hobby, index) => (
                      <div key={index} className="pdf3-hobby-item">
                        <strong>{hobby.title}</strong>
                        <p>{hobby.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LANGUAGES */}
              {visibleSections?.languages && languages.length > 0 && (
                <div className="pdf3-column">
                  <h3 style={{ color: ui.headingColor }}>Languages</h3>
                  <div className="pdf3-languages-list">
                    {languages.map((lang, index) => (
                      <div key={index} className="pdf3-language-item">
                        <div className="pdf3-language-name">{lang.language}</div>
                        <div className="pdf3-language-level">{lang.proficiency}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }

      {/* CUSTOM SECTION */}
      {
        visibleSections?.custom && custom && (
          <div className="pdf3-section pdf3-custom" data-block>
            <h2 style={{ color: ui.headingColor }}>{custom.title}</h2>
            {custom.type === "text" && <p>{custom.description}</p>}
            {custom.type === "list" && (
              <ul>
                {custom.listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {custom.type === "links" && (
              <ul className="pdf3-custom-links">
                {custom.links.map((link, i) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: ui.accentColor }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {custom.type === "contact" && (
              <div className="pdf3-custom-contact">
                <div><strong>Phone:</strong> {custom.phone}</div>
                <div><strong>Email:</strong> {custom.email}</div>
              </div>
            )}
          </div>
        )
      }
    </div >

  );
});

export default React.memo(PDFLayoutThree);

