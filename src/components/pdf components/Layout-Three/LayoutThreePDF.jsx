import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import PdfDocument from "../pdfDocument";
import styles from "./layoutThree.styles";

const LayoutThreePDF = ({
  generalInfo,
  summary,
  experience,
  education,
  projects,
  skills,
  hobbies,
  languages,
  custom,
  visibleSections,
}) => {
  return (
    <PdfDocument>
      <View style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{generalInfo?.name}</Text>
          <Text style={styles.title}>{generalInfo?.title}</Text>

          <Text style={styles.contact}>
            {generalInfo?.email}
            {generalInfo?.email && generalInfo?.phone && "  •  "}
            {generalInfo?.phone}
            {generalInfo?.phone && generalInfo?.location && "  •  "}
            {generalInfo?.location}
          </Text>

          <Text style={styles.contact}>
            {generalInfo?.website}
            {generalInfo?.website && generalInfo?.linkedin && "  •  "}
            {generalInfo?.linkedin}
            {generalInfo?.linkedin && generalInfo?.github && "  •  "}
            {generalInfo?.github}
          </Text>
        </View>

        {/* SUMMARY */}
        {visibleSections?.summary && summary?.summary && (
          <>
            <Text style={styles.sectionTitle}>Professional Profile</Text>
            <Text style={styles.summaryText}>{summary.summary}</Text>
          </>
        )}

        {/* EXPERIENCE */}
        {visibleSections?.experience && experience?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((e, i) => (
              <View key={i} style={styles.expItem}>
                <Text style={styles.expTitle}>
                  {e.position} – <Text style={styles.expCompany}>{e.company}</Text>
                </Text>
                <Text style={styles.expMeta}>
                  {e.startDate} – {e.endDate || "Present"}
                </Text>
                {e.location && (
                  <Text style={styles.expLocation}>{e.location}</Text>
                )}
                {e.achievements && (
                  <Text style={styles.achievementsHead}>{e.achievements.title}</Text>
                )}
                {e.achievements?.points
                  ?.filter(point => point?.trim())
                  .map((achievement, j) => (
                    <View key={j} style={styles.bulletRow} wrap={false}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletText}>{achievement}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </>
        )}

        {/* EDUCATION */}
        {visibleSections?.education && education?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((e, i) => (
              <View key={i} style={styles.eduItem}>
                <Text style={styles.eduDegree}>
                  {e.degree} – <Text style={styles.eduSchool}>{e.school}</Text>
                </Text>
                <Text style={styles.eduMeta}>
                  {e.startDate} – {e.endDate || "Present"}
                </Text>
                {e.location && (
                  <Text style={styles.smallText}>{e.location}</Text>
                )}
                {e.achievements && (
                  <Text style={styles.achievementsHead}>{e.achievements.title}</Text>
                )}
                {e.achievements?.points
                  ?.filter(point => point?.trim())
                  .map((achievement, j) => (
                    <View key={j} style={styles.bulletRow} wrap={false}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletText}>{achievement}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </>
        )}

        {/* PROJECTS */}
        {visibleSections?.projects && projects?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{p.title}</Text>
                {p.link && <Link src={p.link} style={styles.link}>{p.link}</Link>}
                {p.description && (
                  <Text style={styles.projectDesc}>{p.description}</Text>
                )}
                {p.skillsUsed?.length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={styles.projectMetaLabel}>
                      Technologies:
                    </Text>

                    <View style={styles.tagRow}>
                      {p.skillsUsed.map((skill, j) => (
                        <View key={j} style={styles.tagPill}>
                          <Text style={styles.tagText}>{skill}</Text>
                        </View>
                      ))}

                    </View>
                  </View>
                )}
                {p.keyFeatures?.length > 0 && (
                  <View style={{ marginTop: 6 }}>
                    

                    {p.keyFeatures
                      ?.filter(feature => feature?.trim())
                      .length > 0 && (
                        <View style={{ marginTop: 6 }}>
                          <Text style={styles.projectMetaLabel}>
                            Key Features:
                          </Text>

                          {p.keyFeatures
                            .filter(feature => feature?.trim())
                            .map((feature, j) => (
                              <View key={j} style={styles.bulletRow} wrap={false}>
                                <Text style={styles.bulletSymbol}>•</Text>
                                <Text style={styles.bulletText}>{feature}</Text>
                              </View>
                            ))}
                        </View>
                      )}
                  </View>
                )}
              </View>
            ))}
          </>
        )}

        {/* SKILLS */}
        {visibleSections?.skills && skills?.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {skills
                ?.filter(s => s?.skill?.trim())
                .map((s, i) => (
                  <Text key={i} style={styles.skillItem}>
                    {s.skill}
                  </Text>
                ))}
            </View>
          </View>
        )}

        {/* HOBBIES & LANGUAGES */}
        {(visibleSections?.hobbies || visibleSections?.languages) && (
          <>
            <View style={styles.twoColumn}>
              {visibleSections?.hobbies && hobbies?.length > 0 && (
                <View style={styles.column}>
                  <Text style={styles.sectionTitle}>Interests</Text>
                  {hobbies.map((h, i) => (
                    <View key={i} style={styles.hobbyItem}>
                      <Text style={styles.hobbyTitle}>{h.title}</Text>
                      <Text style={styles.hobbyDescription}>{h.description}</Text>
                    </View>
                  ))}
                </View>
              )}

              {visibleSections?.languages && languages?.length > 0 && (
                <View style={styles.column}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  {languages.map((l, i) => (
                    <View key={i} style={styles.langItem}>
                      <Text style={styles.smallText}>{l.language}</Text>
                      <Text style={styles.smallText}>{l.proficiency}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </>
        )}

        {/* CUSTOM */}
        {visibleSections?.custom && custom && (
          <>
            <Text style={styles.sectionTitle}>{custom.title}</Text>
            {custom.type === "text" && <Text>{custom.description}</Text>}
            {custom.type === "list" &&
              custom.listItems.map((item, i) => (
                <Text key={i}>• {item}</Text>
              ))}
            {custom.type === "links" &&
              custom.links.map((link, i) => (
                <Link key={i} src={link} style={styles.link}>{link}</Link>
              ))}
          </>
        )}

      </View>
    </PdfDocument>
  );
};

export default React.memo(LayoutThreePDF);