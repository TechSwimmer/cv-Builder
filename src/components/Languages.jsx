import React, { useState } from "react";

const Languages = ({ data={}, setData, visible, setVisible }) => {
    const addLanguage = () => {
        setData([...data, { language: "", proficiency: "" }]);
      };
  

    const updateLanguage = (index, field, value) => {
        const updatedLanguages = [...data];
        updatedLanguages[index][field] = value;

        // Update the data object with the updated languages array
        setData(updatedLanguages);
    };

    return (
        <div className="language-container-form">
            <div className="toggle-visibility">
                <label> Show Language Section  </label>
                <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                />


            </div>
            {visible && (
                <>
                    <h3>LANGUAGES</h3>
                    {data.map((lang, index) => (
                        <div className="language-entry-form" key={index}>
                            <input
                                type="text"
                                placeholder="Language"
                                value={lang.language}
                                onChange={(e) => updateLanguage(index, "language", e.target.value)}
                            />
                            <select
                                value={lang.proficiency}
                                onChange={(e) => updateLanguage(index, "proficiency", e.target.value)}
                            >
                                <option value="Basic">Basic</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Native">Native</option>
                            </select>
                        </div>
                    ))}

                    <button onClick={addLanguage}>Add Language</button>
                </>
            )}
        </div>
    )
}


export default Languages;