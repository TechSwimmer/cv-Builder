import React, { useState } from "react";
import Headers from "./components/Headers";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CVPreview from "./components/Preview";
import "./styles/App.css";
import Summary from "./components/Summary";
import Skills from "./components/Skills";

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [summary, setSummary] = useState({
    summary:"",
  })

  const [education, setEducation] = useState([{
   
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
   
  }]);

  const [skills, setSkills] = useState([{
    skill: "",
  }]);

  const [experience, setExperience] = useState([{
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
  }]);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);
  const handleEdit = () => setSubmitted(false);

  return (
    <div className="app">
    
    <div className="container">
      {/* Left Side - Forms */}
      <div className="form-container">
        <Headers data={generalInfo} setData={setGeneralInfo} />
        <Summary data={summary} setData={setSummary} />
        <Education data={education} setData={setEducation} />
        <Experience data={experience} setData={setExperience} />
        <Skills data={skills} setData={setSkills} />
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>

      {/* Right Side - Preview */}
      <div className="preview-container">
        <CVPreview
          generalInfo={generalInfo}
          skills={skills}
          summary = {summary}
          education={education}
          experience={experience}
        />
      </div>
    </div>
  </div>
  );
}

export default App;