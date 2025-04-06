import React, {useState} from "react";

function Education({ data=[], setData }) {

    // const formatDate = (dateString) => {
    //     if (!dateString) return ""; // If no date selected, return empty
    //     const date = new Date(dateString);
    //     return `${date.toLocaleString("default", { month: "long" })} - ${date.getFullYear()}`;
    //   };


      // education data
      const [education, setEducation] = useState([
        { school: "", degree: "", startDate: "", endDate: "", location: "" }
      ]);

      const addEducation = () => {
        setData([
          ...data,
          { school: "",location:"", degree: "", startDate: "", endDate: "" }
        ])
      }

      const removeEducation = (index) => {
        if(data.length <= 1) return;
        const updatedEducation = [...data];
        updatedEducation.splice(index, 1);
        setData(updatedEducation)
      }

      const updateEducation = (index, field, value) => {
        const updatedEducation = [...data];
        updatedEducation[index] = { 
          ...updatedEducation[index], 
          [field]:value 
        };
        setData(updatedEducation)   
      }



    return (
      <div className="education-section">
      

      {data.map((edu, index) => (
        <div key={index} className="education-entry">
          <h3>EDUCATION</h3>
          <input
            type="text"
            placeholder="School Name"
            value={edu.school}
            onChange={(e) => updateEducation(index, "school", e.target.value)}
          /> 
          <input
            type="text"
            placeholder="Degree/Field of Study"
            value={edu.degree}
            onChange={(e) => updateEducation(index, "degree", e.target.value)}
          />
          <input
            type="text"
            placeholder="location"
            value={edu.location}
            onChange={(e) => updateEducation(index, "location", e.target.value)}
          />
          
          {/* Start Date */}
          <div className="date-input">
          <label>Start Date:</label>
          <input
             className="date-input-field"
            type="month"
            value={edu.startDate || ""}
            onChange={(e) => updateEducation(index, "startDate", e.target.value)}
          />
          </div>

          {/* End Date */}
          <div className="date-input">
          <label>End Date:</label>
          <input
             className="date-input-field"
            type="month"
            value={edu.endDate || ""}
            onChange={(e) => updateEducation(index, "endDate", e.target.value)}
          />
          </div>

          {/* Remove Button */}
          <button onClick={() => removeEducation(index)}>Remove</button>
          {/* Add Button */}
          <button onClick={addEducation}>Add Education</button>
        </div>
      ))}

      
    </div>
    );
}

export default Education;