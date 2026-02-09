import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import PdfDocument from "../pdfDocument";
import styles from "./layoutTwo.styles";

const LayoutTwoPDF = ({
  generalInfo,
  summary,
  education,
  experience,
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
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>{generalInfo?.name}</Text>
              <Text style={styles.title}>{generalInfo?.title}</Text>
            </View>

            <View style={styles.headerRight}>
              {generalInfo?.email && (
                <Text style={styles.contactItem}>{generalInfo.email}</Text>
              )}
              {generalInfo?.phone && (
                <Text style={styles.contactItem}>{generalInfo.phone}</Text>
              )}
              {generalInfo?.location && (
                <Text style={styles.contactItem}>{generalInfo.location}</Text>
              )}
              {generalInfo?.website && (
                <Link src={generalInfo.website} style={styles.link}>
                  {generalInfo.website}
                </Link>
              )}
              {generalInfo?.linkedin && (
                <Link src={generalInfo.linkedin} style={styles.link}>
                  {generalInfo.linkedin}
                </Link>
              )}
              {generalInfo?.github && (
                <Link src={generalInfo.github} style={styles.link}>
                  {generalInfo.github}
                </Link>
              )}
            </View>
          </View>
        </View>

        {/* BODY */}
        <View style={styles.body}>

          {/* LEFT COLUMN */}
          <View style={styles.left}>
            {visibleSections?.education && education?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHead}>Education</Text>
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
                    {e.achievements?.points?.map((achievement, j) => (
                      <View key={j} style={styles.bulletRow}>
                        <Text style={styles.bulletSymbol}>•</Text>
                        <Text style={styles.bulletText}>{achievement}</Text>
                      </View>
                    )

                    )}
                  </View>
                ))}
              </View>
            )}

            {visibleSections?.languages && languages?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHead}>Languages</Text>
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
                <Text style={styles.sectionHead}>Interests</Text>
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
              <View style={styles.block}>
                <Text style={styles.sectionHead}>Professional Summary</Text>
                <Text style={styles.summaryText}>{summary.summary}</Text>
              </View>
            )}

            {visibleSections?.experience && experience?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHead}>Experience</Text>
                {experience.map((e, i) => (
                  <View key={i}>
                    <View style={styles.expHeader}>
                      <Text style={styles.expTitle}>
                        {e.position} – {e.company}
                      </Text>
                      <Text style={styles.expDates}>
                        {e.startDate} – {e.endDate || "Present"}
                      </Text>
                    </View>
                    {e.location && (
                      <Text style={styles.eduLocation}>{e.location}</Text>
                    )}
                    {e.achievements && (
                      <Text style={styles.achievementsHead}>{e.achievements.title}</Text>
                    )}
                    {e.achievements?.points?.map((achievement, j) => (
                      <View key={j} style={styles.bulletRow}>
                        <Text style={styles.bulletSymbol}>•</Text>
                        <Text style={styles.bulletText}>{achievement}</Text>
                      </View>

                    )

                    )}
                  </View>
                ))}
              </View>
            )}

            {visibleSections?.projects && projects?.length > 0 && (
              <View style={styles.block}>
                <Text style={styles.sectionHead}>Projects</Text>

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

                    {/* Key Features */}
                    {p.keyFeatures?.length > 0 && (
                      <View style={{ marginTop: 6 }}>
                        <Text style={styles.projectMetaLabel}>
                          Key Features:
                        </Text>

                        {p.keyFeatures.map((feature, j) => (
                          <View key={j} style={styles.bulletRow}>
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
                <Text style={styles.sectionHead}>Skills</Text>
                <View style={styles.skillsGrid}>
                  {skills.map((s, i) => (
                    <Text key={i} style={styles.skillItem}>
                      {s.skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}

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

        </View>
      </View>
    </PdfDocument>
  );
};

export default React.memo(LayoutTwoPDF);