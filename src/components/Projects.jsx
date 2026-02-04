import React, { useState } from "react";

const Projects = ({ projects = [], setProjects, visible, setVisible }) => {


    const handleChange = (index, e) => {
        const updatedProjects = [...projects];
        updatedProjects[index] = { ...updatedProjects[index], [e.target.name]: e.target.value }
        setProjects(updatedProjects);

    };

    const handleArrayChange = (index, e, field) => {
        const values = e.target.value.split(",").map(item => item.trim());
        const updatedProjects = [...projects];
        updatedProjects[index] = { ...updatedProjects[index], [field]: values };
        setProjects(updatedProjects);
    };

    const addProject = () => {
        setProjects([...projects, { title: "", description: "", category: "", skillsUsed: [], keyFeatures: [] }])
    }

    const removeProject = (index) => {
        if (projects.length === 1) { return; }
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    }


    // key feature management
    const [newFeature, setNewFeature] = useState(""); // Track new feature input

    const addFeature = (index) => {
        if (!newFeature.trim()) return;

        const updatedProjects = [...projects];
        updatedProjects[index].keyFeatures.push(newFeature);
        setProjects(updatedProjects);
        setNewFeature(""); // Clear input after adding
    };

    const removeFeature = (projectIndex, featureIndex) => {
        const updatedProjects = [...projects];
        updatedProjects[projectIndex].keyFeatures.splice(featureIndex, 1);
        setProjects(updatedProjects);
    };

    return (
        <div className="projects-container">
            <div className="toggle-visibility-btn">
                <h3>Projects</h3>
            
            <div
                className={`toggle-pill ${visible ? "on" : ""}`}
                onClick={() => setVisible(!visible)}
            >
                <div className="toggle-text-track">
                    <span className="toggle-text hide">Show</span>
                    <span className="toggle-text show">Hide</span>
                </div>

                <div className="toggle-knob" />
            </div>
            </div>
            {visible && (
                <>
                   
                    {projects.map((project, index) => (
                        <div key={index} className="project-entry">

                            <input
                                type="text"
                                name="title"
                                placeholder="Project-title"
                                value={project?.title || ""}
                                onChange={(e) => handleChange(index, e)}
                            />



                            <textarea
                                name="description"
                                placeholder="Project description"
                                value={project?.description || ""}
                                onChange={(e) => handleChange(index, e)}
                            />



                            <div className="projects-skills">
                                <label>Skills used :</label>
                                <input
                                    type="text"
                                    placeholder="Enter skills seperated by commas (e.g. Javascript,Node.js etc.)"
                                    value={project?.skillsUsed?.join(",") || ""}
                                    onChange={(e) => handleArrayChange(index, e, "skillsUsed")}
                                />
                            </div>
                            <div className="projects-key-feature">
                                <div className="key-features-list">
                                    <label>Key features :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter a feature and press Add"
                                        value={newFeature || ""}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                    />
                                </div>


                                <button type="button" className="add-feat-btn" onClick={() => addFeature(index)}>Add</button>
                            </div>
                            <div className="projects-skills">
                                <label>Link :</label>
                                <input
                                    type="text"
                                    name="link"
                                    placeholder="Add the link to live demo or github"
                                    value={project?.link || ""}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="add-rem-proj-btn">
                            <button className="remove-btn" onClick={() => removeProject(index)}>Remove Project</button>
                            <button className="add-btn" onClick={addProject}>Add Project</button>
                            </div>
                        </div>
                    ))}
                </>
            )}


        </div>
    )
}

export default Projects;