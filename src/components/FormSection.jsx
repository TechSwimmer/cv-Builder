import React from "react"
import Headers from "./Headers"
import Education from "./Education"
import Experience from "./Experience"
import Preview from "./Preview"
import Skills from "./Skills"
import Summary from "./Summary"
import Projects from "./Projects"


const FormSection = ({formData={}, setFormData, onSubmit}) => {

    const handleDataChange = (section,updatedData) => {
       setFormData((prev) => ({
        ...prev,
        [section]: updatedData,
       }));
    };

    return (
        <div className="form-container">
            <Headers
                data= {formData.generalInfo}
                setData = {(data) => handleDataChange("generalInfo", data)}
            />
            <Summary
                data={formData.summary}
                setData={(data) => handleDataChange("summary", data)}
            />
            <Education
                data={formData.education}
                setData={(data) => handleDataChange("education", data)}
            />
            <Experience 
                data={formData.experience}
                setData={(data) => handleDataChange("experience", data)}
            />
            <Projects
                projects={formData.projects}
                setProjects={(data) => handleDataChange("projects", data)}
            />
            <Skills 
                data={formData.skills}
                setData={(data) => handleDataChange("skills", data)}
            />
            <button className="submit-btn" onClick={onSubmit}>
                Submit
            </button>
        </div>
    )

}

export default FormSection;