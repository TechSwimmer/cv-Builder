import React, { useState, useEffect } from "react";


const Custom = ({ data, setData, visible, setVisible }) => {

    useEffect(() => {
        if (data && !data.listItems) {
          setData({ ...data, listItems: [] });
        }
      }, [data, setData]);

    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        
            setData( localData );
        
    }, [localData]);

    const handleChange = (e) => {

        const { name, value } = e.target;
        console.log(`Value: ${value}`);
        setLocalData((prev) => {
            let updated = { ...prev, [name]: value };

            if (name === "type") {
                if (value === "list" && !prev.listItems) {
                    updated.listItems = [""];
                }
                if (value === "links" && !prev.links) {
                    updated.links = [""];
                }
                if (value === "contact" && !prev.email) {
                    updated.email = "";
                }
                if (value === "text" && !prev.description) {
                    updated.description = "";
                }
            }

            return updated;
        });
    };

    const handleListChange = (e,index) => {
        
        
        const newListItems = [...localData.listItems];
        newListItems[index] = e.target.value;
        setLocalData((prev) => ({ ...prev, listItems: newListItems }))
        
        
    }


    const addListItem = () => {
        setLocalData((prev) => ({ ...prev, listItems: [...prev.listItems, ""] }));
    }

    const handleLinkChange = (e,index) => {
        const newLinks = [...localData.links]
        newLinks[index] = e.target.value;
        setLocalData((prev) => ({...prev,links:newLinks}))
    }

    const addLink = () => {
        setLocalData((prev) => ({...prev,links: [...prev.links,""]}));
    };


    useEffect(() => {
        setData(localData);
    }, [localData]);

    return (
        <div className="custom-container-form">
            <div className="toggle-visibility">
                <label> Show Custom Section  </label>
                <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                />
            </div>
            {visible && (
                <>
                    <label>Custom Section Heading</label>
                    <input
                        type="text"
                        placeholder="Heading"
                        name="title"
                        value={data.title || ""}
                        onChange={handleChange}
                    />

                    <label>Content Type</label>
                    <select name="type" value={data.type} onChange={handleChange}>
                        <option value="text">Descriptive text</option>
                        <option value="list">List</option>
                        <option value="contact">Contact</option>
                        <option value="links">Links</option>
                    </select>

                    {data.type === "text" && (
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                        />
                    )}
                    {data.type === "list" && (
                        <div className="list-items">
                            {(data.listItems || []).map((item, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    value={data.listItems[i] || ""}
                                    onChange={(e) => handleListChange(e,i)}
                                />

                            ))}
                            <button type="button" onClick={addListItem}>
                                + Add List Item
                            </button>
                        </div>
                    )}
                    {data.type === "contact" && (
                        <div className="custom-form-contact">
                            <div className="custom-form-phone">
                            <label>Phone: </label>
                            <input
                                name="phone"
                               
                                value={data.phone || ""}
                                onChange={handleChange}
                            />
                            </div>
                           <div className="custom-form-email">
                           <label>Email:</label>
                            <input
                                name="email"
                                type="email"
                                value={data.email || ""}
                                onChange={handleChange}
                            />
                           </div>
                           

                        </div>
                    )}

                    {data.type === "links" && (
                        <div className="links">
                            {(localData.links || []).map((link, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    placeholder="https://..."
                                    value={link || ""}
                                    onChange={(e) => handleLinkChange(e,i)}
                                />
                            ))}
                            <button
                                type="button"
                                onClick={addLink}
                            >
                                + Add Link
                            </button>
                        </div>
                    )}
                </>
            )}

        </div>
    )
}



export default Custom;