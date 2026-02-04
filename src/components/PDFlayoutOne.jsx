import React, { forwardRef } from "react";
import "../styles/pdfstyles/PdfLayoutOne.css";

import PDFDocumentLayoutOne from "./PdfDocumentLayoutOne";

const PDFLayoutOne = forwardRef((props = {}, ref) => {
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
    <PDFDocumentLayoutOne ref={ref}>
      <div className="pdf1-page">
        <div className="pdf1-body">
          {/* LEFT COLUMN - SIDEBAR */}
          <div className="pdf1-left">
            {/* General Info */}
            <div className="pdf1-section pdf1-general" data-col="left" data-fixed>
              {generalInfo?.name && <h3>{generalInfo.name}</h3>}
              {generalInfo?.title && <div style={{ color: "#3498db", fontWeight: "600", fontSize: "14px" }}>{generalInfo.title}</div>}
              {generalInfo?.email && <div>{generalInfo.email}</div>}
              {generalInfo?.phone && <div>{generalInfo.phone}</div>}
              {generalInfo?.location && <div>{generalInfo.location}</div>}
              {generalInfo?.website && <div><a href={generalInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>{generalInfo.website}</a></div>}
              {generalInfo?.linkedin && <div><a href={generalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>{generalInfo.linkedin}</a></div>}
              {generalInfo?.github && <div><a href={generalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>{generalInfo.github}</a></div>}
            </div>

            {/* Education */}
            {visibleSections?.education && education.length > 0 && (
              <>
                {education.map((e, i) => (
                  <div key={i} className="pdf1-block" data-col="left">

                    {i === 0 && <h3>Education</h3>}

                    <div className="edu-item">
                      <strong>{e.school}</strong>
                      <strong>{e.degree}</strong>
                      <div className="pdf1-text">{e.startDate} - {e.endDate || "Current"}</div>
                      {e.location && <p>{e.location}</p>}

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
                <h3>Languages</h3>
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
                <h3>Hobbies & Interests</h3>
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

                <h3>Professional Summary</h3>

                <p>{summary.summary}</p>

              </div>
            )}

            {/* Experience */}
            {visibleSections?.experience && experience.length > 0 && (
              <>
                {experience.map((e, i) => (
                  <div key={i} className="pdf1-block" data-col="right">

                    {i === 0 && <h3>Work Experience</h3>}

                    <div className="exp-item">
                      <strong>{e.position} – {e.company}</strong>
                      <div className="pdf1-text">{e.startDate} - {e.endDate || "Current"}</div>

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

                    {index === 0 && <h3>Projects</h3>}

                    <div className="project-item">
                      <strong>{proj.title}</strong>

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
                          <ul>
                            {proj.keyFeatures.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {proj.link && (
                        <p>
                          <strong>Project Link:</strong>{" "}
                          <a href={proj.link} target="_blank" rel="noopener noreferrer">
                            {proj.link}
                          </a>
                        </p>
                      )}
                    </div>

                  </div>
                ))}
              </>
            )}


            {/* Skills */}
            {visibleSections?.skills && skills.length > 0 && (
              <>
                {Array.from({ length: Math.ceil(skills.length / 6) }).map((_, chunkIndex) => {
                  const chunk = skills.slice(chunkIndex * 6, chunkIndex * 6 + 6);

                  return (
                    <div key={chunkIndex} className="pdf1-block" data-col="right">

                      {chunkIndex === 0 && <h3>Skills</h3>}

                      <div style={{ marginTop: "8px" }}>
                        {chunk.map((s, i) => (
                          <span key={i} className="pdf1-skill">{s.skill}</span>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </>
            )}

            {/* Custom Section */}
            {visibleSections?.custom && custom && (
              <div className="pdf1-block" data-col="right">

                <h3>{custom.title}</h3>

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
                        <a href={link} target="_blank" rel="noopener noreferrer">
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
    </PDFDocumentLayoutOne>
  );
});


export default PDFLayoutOne;