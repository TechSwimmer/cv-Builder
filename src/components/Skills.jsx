import React, { useState } from "react";

const Skills = ({data, setData}) => {

    const addSkill = () => {
        setData([
            ...data,
            { skill: "" }
        ])
    }

    const removeSkill = (index) => {
        if(data.length <= 1) return;
        const updatedSkills = [...data];
        updatedSkills.splice(index, 1);
        setData(updatedSkills)
    }

    const updateSkill = (index, value) => {
        const updatedSkill = [...data];
        updatedSkill[index] = {
            ...updatedSkill[index],
            skill: value
        };
        setData(updatedSkill);
    }

    return (
        <div className="skills-container">
            <h3>SKILLS</h3>

            {data.map((skillObj, index) => (
                <div key={index} className="skill-container-input">
                    <input
                        type="text"
                        placeholder="add a skill"
                        value={skillObj.skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                    />
                    <div className="skills-container-btns">
                    <button onClick={addSkill}>Add Skill</button>
                    <button onClick={() => removeSkill(index)}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default Skills;