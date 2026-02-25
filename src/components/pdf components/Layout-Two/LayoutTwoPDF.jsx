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
  style = {}
}) => {

  const pdfTheme = {
    fontFamily: style.fontFamily || "Helvetica",

    headingColor: style.headingColor || "#1f2937",
    textColor: style.textColor || "#374151",
    accentColor: style.accentColor || "#2563eb",
    pageBg: style.pageBg || "#ffffff",
    skillBox: style.skillBox || "#2563eb",
    skillTextColor: style.skillTextColor || '#ffffff'
  };



  return (
    <PdfDocument>
      <View style={[styles.page, { backgroundColor: pdfTheme.pageBg, fontFamily: pdfTheme.fontFamily }]}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={[styles.name, { color: pdfTheme.headingColor }]}>{generalInfo?.name}</Text>
              <Text style={[styles.title, { color: pdfTheme.accentColor }]}>{generalInfo?.title}</Text>
            </View>

            <View style={styles.headerRight}>

              {generalInfo?.phone && (
                <Text style={styles.contactItem}>{generalInfo.phone}</Text>
              )}
              {generalInfo?.location && (
                <Text style={styles.contactItem}>{generalInfo.location}</Text>
              )}
              {generalInfo?.email && (
                <Text style={[styles.contactItem, { color: pdfTheme.accentColor }]}>{generalInfo.email}</Text>
              )}
              {generalInfo?.website && (
                <Link src={generalInfo.website} style={[styles.link, { color: pdfTheme.accentColor }]}>
                  {generalInfo.website}
                </Link>
              )}
              {generalInfo?.linkedin && (
                <Link src={generalInfo.linkedin} style={[styles.link, { color: pdfTheme.accentColor }]}>
                  {generalInfo.linkedin}
                </Link>
              )}
              {generalInfo?.github && (
                <Link src={generalInfo.github} style={[styles.link, { color: pdfTheme.accentColor }]}>
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
                <Text style={[styles.sectionHead, { color: pdfTheme.headingColor }]}>Education</Text>
                {education.map((e, i) => (
                  <View key={i}>
                    <Text style={[styles.eduDegree, { color: pdfTheme.textColor }]}>{e.degree}</Text>
                    <Text style={[styles.eduSchool, { color: pdfTheme.textColor }]}>{e.school}</Text>
                    <Text style={[styles.eduDates, { color: pdfTheme.textColor }]}>
                      {e.startDate} – {e.endDate || "Present"}
                    </Text>
                    {e.location && (
                      <Text style={[styles.eduLocation, { color: pdfTheme.textColor }]}>{e.location}</Text>
                    )}
                    {e.achievements && (
                      <Text style={[styles.achievementsHead, { color: pdfTheme.headingColor }]}>{e.achievements.title}</Text>
                    )}
                    {e.achievements?.points
                      ?.filter(point => point?.trim())
                      .map((achievement, j) => (
                        <View key={j} style={styles.bulletRow} wrap={false}>
                          <Text style={[styles.bulletSymbol, { color: pdfTheme.textColor }]}>•</Text>
                          <Text style={[styles.bulletText, { color: pdfTheme.textColor }]}>{achievement}</Text>
                        </View>
                      ))}
                  </View>
                ))}
              </View>
            )}

            {visibleSections?.languages && languages?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHead, { color: pdfTheme.headingColor }]}>Languages</Text>
                {languages.map((l, i) => (
                  <View key={i} style={styles.langItem}>
                    <Text style={[styles.smallText, { color: pdfTheme.textColor }]}>{l.language}</Text>
                    <Text style={[styles.smallTextLang, { color: pdfTheme.textColor }]}>{l.proficiency}</Text>
                  </View>
                ))}
              </View>
            )}

            {visibleSections?.hobbies && hobbies?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHead, { color: pdfTheme.headingColor }]}>Interests</Text>
                {hobbies.map((h, i) => (
                  <View key={i} style={styles.hobbyItem}>
                    <Text style={[styles.hobbyTitle, { color: pdfTheme.headingColor }]}>{h.title}</Text>
                    <Text style={[styles.hobbyDescription, { color: pdfTheme.textColor }]}>{h.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT COLUMN */}
          <View style={styles.right}>
            {visibleSections?.summary && summary?.summary && (
              <View style={styles.block}>
                <Text style={[styles.sectionHead, { color: pdfTheme.headingColor }]}>Professional Profile</Text>
                <Text style={[styles.summaryText, { color: pdfTheme.textColor }]}>{summary.summary}</Text>
              </View>
            )}

            {visibleSections?.experience && experience?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHead, { color: pdfTheme.headingColor }]}>Work Experience</Text>
                {experience.map((e, i) => (
                  <View key={i}>
                    <View style={styles.expHeader}>
                      <Text style={styles.expTitle}>
                        <Text style={[styles.expPosition, { color: pdfTheme.textColor }]}>{e.position}</Text>
                        {"\n"}
                        <Text style={[styles.expCompany, { color: pdfTheme.textColor }]}>{e.company}</Text>
                      </Text>
                      <Text style={[styles.expDates, { color: pdfTheme.textColor }]}>
                        {e.startDate} – {e.endDate || "Present"}
                      </Text>
                    </View>
                    {e.location && (
                      <Text style={[styles.eduLocation, { color: pdfTheme.textColor }]}>{e.location}</Text>
                    )}
                    {e.achievements && (
                      <Text style={[styles.achievementsHead, { color: pdfTheme.headingColor }]}>{e.achievements.title}</Text>
                    )}
                    {e.achievements?.points
                      ?.filter(point => point?.trim())
                      .map((achievement, j) => (
                        <View key={j} style={styles.bulletRow} wrap={false}>
                          <Text style={[styles.bulletSymbol, { color: pdfTheme.textColor }]}>•</Text>
                          <Text style={[styles.bulletText, { color: pdfTheme.textColor }]}>{achievement}</Text>
                        </View>
                      ))}
                  </View>
                ))}
              </View>
            )}

            {visibleSections?.projects && projects?.length > 0 && (
              <View style={styles.block}>
                <Text style={[styles.sectionHead, { color: pdfTheme.headingColor }]}>Projects</Text>

                {projects.map((p, i) => (
                  <View key={i} style={{ marginBottom: 14 }}>

                    {/* Project title + link */}
                    <View style={{ marginBottom: 4 }}>
                      <Text style={[styles.projectTitle, { color: pdfTheme.textColor }]}>{p.title}</Text>

                      {p.link && (
                        <Link src={p.link} style={[styles.link, { color: pdfTheme.accentColor }]}>
                          {p.link}
                        </Link>
                      )}
                    </View>

                    {/* Description */}
                    {p.description && (
                      <Text style={[styles.projectDesc, { color: pdfTheme.textColor }]}>{p.description}</Text>
                    )}

                    {/* Technologies */}
                    {p.skillsUsed?.length > 0 && (
                      <View style={{ marginTop: 4 }}>
                        <Text style={[styles.projectMetaLabel, { color: pdfTheme.textColor }]}>
                          Technologies:
                        </Text>

                        <View style={styles.tagRow}>
                          {p.skillsUsed.map((skill, j) => (
                            <View key={j} style={[styles.tagPill, { backgroundColor: pdfTheme.accentColor }]}>
                              <Text style={[styles.tagText, { color: pdfTheme.skillTextColor }]}>{skill}</Text>
                            </View>
                          ))}

                        </View>
                      </View>
                    )}

                    {/* Key Features */}
                    {p?.keyFeatures?.points?.filter(point => point?.trim()).length > 0 && (
                      <View style={{ marginTop: 6 }}>
                        {p?.keyFeatures?.title?.trim() && (
                          <Text style={[styles.projectMetaLabel, { color: pdfTheme.textColor }]}>
                            {p.keyFeatures.title.trim()}
                          </Text>
                        )}

                        {p.keyFeatures.points
                          .filter(point => point?.trim())
                          .map((point, j) => (
                            <View key={j} style={styles.bulletRow} wrap={false}>
                              <Text style={[styles.bulletSymbol, { color: pdfTheme.textColor }]}>•</Text>
                              <Text style={[styles.bulletText, { color: pdfTheme.textColor }]}>{point}</Text>
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
                <Text style={[styles.sectionHead, { color: pdfTheme.headingColor }]}>Skills</Text>
                <View style={styles.skillsGrid}>
                  {skills
                    ?.filter(s => s?.skill?.trim())
                    .map((s, i) => (
                      <Text key={i} style={[styles.skillItem, { backgroundColor: pdfTheme.skillBox, color: pdfTheme.skillTextColor }]}>
                        {s.skill}
                      </Text>
                    ))}
                </View>
              </View>
            )}

            {visibleSections?.custom && custom && (
              <>
                <Text style={[styles.sectionTitle, { color: pdfTheme.headingColor }]}>{custom.title}</Text>
                {custom.type === "text" && <Text style={[{ color: pdfTheme.textColor }]}>{custom.description}</Text>}
                {custom.type === "list" &&
                  custom.listItems.map((item, i) => (
                    <Text key={i} style={[{ color: pdfTheme.textColor }]}>• {item}</Text>
                  ))}
                {custom.type === "links" &&
                  custom.links.map((link, i) => (
                    <Link key={i} src={link} style={[styles.link, { color: pdfTheme.accentColor }]}>{link}</Link>
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