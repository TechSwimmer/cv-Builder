import React, {useState} from "react";

function Experience({ data=[], setData }) {

  const addExperience = () => {
    setData([
      ...data,
      { company: "", location: "", position: "", startDate: "", endDate: "" }
    ])
  }

  
  const removeExperience = (index) => {
    if(data.length <= 1) return;
    const updatedExperience = [...data];
    updatedExperience.splice(index, 1);
    setData(updatedExperience)
  }

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...data];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setData(updatedExperience)
  }




  const formatDate = (dateString) => {
    if (!dateString) return ""; // If no date selected, return empty
    const date = new Date(dateString);
    return `${date.toLocaleString("default", { month: "long" })} - ${date.getFullYear()}`;
  };

  return (
    <div className="experience-section">
      <h3>EMPLOYEMENT HISTORY</h3>
      {data.map((exp, index) => (
        <div key={index} className="experience-entry">
          
          <input
            type="text"
            placeholder="Company Name"
            value={exp.company || ""}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
          />

          <input
            type="text"
            placeholder="Position"
            value={exp.position || ""}
            onChange={(e) => updateExperience(index, "position", e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={exp.location || ""}
            onChange={(e) => updateExperience(index, "location", e.target.value)}
          />
          <div className="date-input">
          <label>Start Date</label>
          <input
            className="date-input-field"
            type="month"
            placeholder="Start Date"
            value={exp.startDate || ""}
            onChange={(e) => updateExperience(index, "startDate", e.target.value)}
          />
          </div>
          <div className="date-input">
          <label>End Date</label>
          <input
             className="date-input-field"
            type="month"
            placeholder="End Date"
            value={exp.endDate || ""}
            onChange={(e) => updateExperience(index, "endDate", e.target.value)}
          />
          </div>

          <button className="remove-btn" onClick={() => removeExperience(index)}>Remove</button>
          <button className="add-btn" onClick={addExperience}>Add Experience</button>
        </div>
      ))}

      
    </div>
  );
}

export default Experience;