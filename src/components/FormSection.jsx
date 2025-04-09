import React, {useState} from "react"
import Headers from "./Headers"
import Education from "./Education"
import Experience from "./Experience"
import Preview from "./Preview"
import Skills from "./Skills"
import Summary from "./Summary"
import Projects from "./Projects"
import Hobbies from "./Hobbies"


const FormSection = ({ formData = {}, setFormData, onSubmit, visibleSections,setVisibleSections }) => {

    const handleDataChange = (section, updatedData) => {
        setFormData((prev) => ({
            ...prev,
            [section]: updatedData,
        }));
    };


 
    return (
        <div className="form-section">
            <div className="form-container">
                <Headers
                    data={formData.generalInfo}
                    setData={(data) => handleDataChange("generalInfo", data)}
                />
                <Summary
                    data={formData.summary}
                    setData={(data) => handleDataChange("summary", data)}
                    visible={visibleSections.summary}
                    setVisible={((val) => setVisibleSections((prev) => ({... prev, summary:val})))}
                />
                <Education
                    data={formData.education}
                    setData={(data) => handleDataChange("education", data)}
                    visible={visibleSections.education}
                    setVisible={((val) => setVisibleSections((prev) => ({... prev, education:val})))}
                />
                <Experience
                    data={formData.experience}
                    setData={(data) => handleDataChange("experience", data)}
                    visible={visibleSections.experience}
                    setVisible={((val) => setVisibleSections((prev) => ({... prev, experience:val})))}
                />
                <Projects
                    projects={formData.projects}
                    setProjects={(data) => handleDataChange("projects", data)}
                    visible={visibleSections.projects}
                    setVisible={((val) => setVisibleSections((prev) => ({... prev, projects:val})))}
                />
                <Skills
                    data={formData.skills}
                    setData={(data) => handleDataChange("skills", data)}
                    visible={visibleSections.skills}
                    setVisible={((val) => setVisibleSections((prev) => ({...prev, skills:val})))}
                />
                <Hobbies
                    data={formData.hobbies}
                    setData= {(data) => handleDataChange("hobbies",data)}
                    visible={visibleSections.hobbies}
                    setVisible={((val) => setVisibleSections((prev) => ({...prev, hobbies:val})))}
                />
                <div style={{ height: "210px", flexShrink: 0 }} />
            </div>
            <div className="form-section-btn">
                <button className="submit-btn" onClick={onSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )

}

export default FormSection;