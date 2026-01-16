import React from "react"
import Headers from "./Headers"
import Education from "./Education"
import Experience from "./Experience"

import Skills from "./Skills"
import Summary from "./Summary"
import Projects from "./Projects"
import Hobbies from "./Hobbies"
import Languages from "./Languages"
import Custom from "./Custom"


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
                <Languages
                    data={formData.languages}
                    setData= {(data) => handleDataChange("languages",data)}
                    visible={visibleSections.languages}
                    setVisible={((val) => setVisibleSections((prev) => ({...prev,languages:val})))}
                    />
                <Custom
                    data={formData.custom}
                    setData={(data) => handleDataChange("custom",data)}
                    visible={visibleSections.custom}
                    setVisible={(val) => setVisibleSections((prev) => ({...prev,custom:val}))}
                    />
                <div style={{ height: "210px", flexShrink: 0 }} />
            </div>
         
        </div>
    )

}

export default FormSection;