import React from "react";

const Hobbies = ({ data=[], setData, visible, setVisible }) => {




    const addHobby = () => {
        setData([...data,{ title: "",description: ""}])
    };

    const removeHobby = (index) => {
        const updated = [...data];
        updated.splice(index, 1);
        setData(updated);
    }

    const updateHobby = (index, field, value) => {
        const updated = [...data]
        updated[index][field] = value;
        setData(updated);
    }

    return (
        <div className="hobbies-container-form">
            <div className="toggle-visibility">
                <label>
                    Show Hobbies Section
                </label>
                <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                />
            </div>
            {visible && (
                <>
                    <h3>HOBBIES & INTERESTS</h3>
                    {data.map((hobby, index) => (
                        <div key={index} className="hobby-entry">
                            <input
                                type="text"
                                placeholder="Hobby title"
                                value={hobby.title}
                                onChange={(e) => updateHobby(index, "title", e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                value={hobby.description}
                                onChange={(e) => updateHobby(index, "description", e.target.value)}
                            />
                                <button onClick={() => removeHobby(index)}>Remove Hobby</button>
                                
                        </div>
                    ))}
                    <button onClick={addHobby}>Add Hobby</button>
                </>
            )}
        </div>
    )
}


export default Hobbies;