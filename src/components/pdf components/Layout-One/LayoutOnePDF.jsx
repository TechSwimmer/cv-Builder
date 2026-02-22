import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import PdfDocument from "../pdfDocument.jsx";
import styles from "./layoutOne.styles";

const LayoutOnePDF = ({
  generalInfo,
  summary,
  education,
  experience,
  projects,
  skills,
  languages,
  hobbies,
  custom,
  visibleSections,
}) => {
  return (
    <PdfDocument>
      <View style={styles.page}>
        <View style={styles.body}>

          {/* LEFT COLUMN */}
          <View style={styles.left}>
            {generalInfo?.name && (
              <Text style={styles.name}>{generalInfo.name}</Text>
            )}

            {generalInfo?.title && (
              <Text style={styles.title}>{generalInfo.title}</Text>
            )}

            {generalInfo?.email && (
              <Link style={styles.link} src={`mailto:${generalInfo.email}`}>
                {generalInfo.email}
              </Link>
            )}

            {generalInfo?.phone && (
              <Text style={styles.text}>{generalInfo.phone}</Text>
            )}

            {generalInfo?.location && (
              <Text style={styles.text}>{generalInfo.location}</Text>
            )}

            {generalInfo?.github && (
              <Link style={styles.link} src={generalInfo.github}>
                {generalInfo.github}
              </Link>
            )}
            {generalInfo?.linkedin && (
              <Link style={styles.link} src={generalInfo.linkedin}>
                {generalInfo.linkedin}
              </Link>
            )}
            {generalInfo?.website && (
              <Link style={styles.link} src={generalInfo.website}>
                {generalInfo.website}
              </Link>
            )}

            {visibleSections?.education && education?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHeader}>Education</Text>
                {education.map((e, i) => (
                  <View key={i}>
                    <Text style={styles.eduDegree}>{e.degree}</Text>
                    <Text style={styles.eduSchool}>{e.school}</Text>
                    <Text style={styles.eduDates}>
                      {e.startDate} – {e.endDate || "Present"}
                    </Text>
                    {e.location && (
                      <Text style={styles.eduLocation}>{e.location}</Text>
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
              </View>
            )}

            {visibleSections?.languages && languages?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHeader}>Languages</Text>
                {languages.map((l, i) => (
                  <View key={i} style={styles.langItem}>
                    <Text style={styles.smallText}>{l.language}</Text>
                    <Text style={styles.smallText}>{l.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}

            {visibleSections?.hobbies && hobbies?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHeader}>Interests</Text>
                {hobbies.map((h, i) => (
                  <View key={i} style={styles.hobbyItem}>
                    <Text style={styles.hobbyTitle}>{h.title}</Text>
                    <Text style={styles.hobbyDescription}>{h.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT COLUMN */}
          <View style={styles.right}>
            {visibleSections?.summary && summary?.summary && (
              <>
                <Text style={styles.sectionHeader}>Professional Summary</Text>
                <Text style={styles.text}>{summary.summary}</Text>
              </>
            )}

            {visibleSections?.experience && experience?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHeader}>Experience</Text>
                {experience.map((e, i) => (
                  <View key={i}>
                    <View style={styles.expHeader}>
                      <Text style={styles.expTitle}>
                        <Text style={styles.expPosition}>{e.position}</Text>
                        {"\n"}
                        <Text style={styles.expCompany}>{e.company}</Text>
                      </Text>
                      <Text style={styles.expDates}>
                        {e.startDate} {" "}–{" "} {e.endDate || "Present"}
                      </Text>
                    </View>
                    {e.location && (
                      <Text style={styles.eduLocation}>{e.location}</Text>
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
              </View>
            )}

            {visibleSections?.projects && projects?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHeader}>Projects</Text>

                {projects.map((p, i) => (
                  <View key={i} style={{ marginBottom: 14 }}>

                    {/* Project title + link */}
                    <View style={{ marginBottom: 4 }}>
                      <Text style={styles.projectTitle}>{p.title}</Text>

                      {p.link && (
                        <Link src={p.link} style={styles.link}>
                          {p.link}
                        </Link>
                      )}
                    </View>

                    {/* Description */}
                    {p.description && (
                      <Text style={styles.projectDesc}>{p.description}</Text>
                    )}

                    {/* Technologies */}
                    {p.skillsUsed?.length > 0 && (
                      <View style={{ marginTop: 4 }}>
                        <Text style={styles.projectMetaLabel}>
                          Technologies :
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

                    {/* Key Features */}
                    {p?.keyFeatures?.points
                      ?.filter(feature => feature?.trim())
                      .length > 0 && (
                        <View style={{ marginTop: 6 }}>
                          <Text style={styles.projectMetaLabel}>
                            {p?.keyFeatures?.title}
                          </Text>

                          {p?.keyFeatures?.points
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
                ))}
              </View>
            )}



            {visibleSections?.skills && skills?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHeader}>Skills</Text>
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
            {visibleSections?.custom && custom && (
              <>
                <Text style={styles.sectionHeader}>{custom.title}</Text>
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

        </View>
      </View>
    </PdfDocument>
  );
};

export default React.memo(LayoutOnePDF);