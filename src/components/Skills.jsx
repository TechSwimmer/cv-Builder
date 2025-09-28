import React from "react";

const Skills = ({data, setData,visible,setVisible}) => {

    
      // skills data
      
      
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
            <div className="toggle-visibility">
                <label>Show Skills Section</label>
                <input 
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                />
                
                
            </div>
            { visible && (
                <>
            <h3>SKILLS</h3>

            {data.map((skillObj, index) => (
                <div key={index} className="skill-container-input">
                    <input
                        type="text"
                        placeholder="add a skill"
                        value={skillObj.skill || ""}
                        onChange={(e) => updateSkill(index, e.target.value)}
                    />
                    <div className="skills-container-btns">
                    <button onClick={addSkill}> + </button>
                    <button onClick={() => removeSkill(index)}>x</button>
                    </div>
                </div>
            ))}
            </>
        )}
        </div>
   
    )
}


export default Skills;