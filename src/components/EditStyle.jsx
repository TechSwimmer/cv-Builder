import React, { useState } from "react";
import "../styles/EditStyle.css";

const EditStyle = ({ customStyles, setCustomStyles, updateStyles }) => {
 

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the parent component's state directly
        setCustomStyles((prev) => ({
            ...prev,
            [name]: name.includes('font') ? `${value}px` : value
        }));
    };

    // Extract numeric value for the input (remove "px")
    const fontSizeValueHeaders = customStyles.fontHeaderSize.replace('px', '');

    const fontSizeValueContent = customStyles.fontContentSize.replace('px', '');

    return (
        <div>
            <div className="edit-style-container">
                <h2>Edit Style</h2>

                {/* Font Size */}
                <div className="font-input-container">
                <label>Font Size: (Headers)</label>
                <input
                    type="number"
                    name="fontHeaderSize"
                    value={fontSizeValueHeaders}
                    onChange={handleChange}
                    min="28"
                    max="34"
                />
                </div>
                <div className="font-input-container">
                <label>Font Size: (content)</label>
                <input
                    type="number"
                    name="fontContentSize"
                    value={fontSizeValueContent}
                    onChange={handleChange}
                    min="22"
                    max="28"
                />
                </div>
                <div className="font-input-container">
                {/* Font Family */}
                <label >Font Family:</label>
                <select name="fontFamily" value={customStyles.fontFamily} onChange={handleChange}>
                    <option value="Lucida Console, monospace">Lucida Console</option>
                    <option value="DejaVu Sans Mono, monospace">DejaVu Sans Mono</option>
                    <option value="Courier New, monospace">Courier New</option>
                    <option value="Consolas, monospace">Consolas</option>
                </select>
                </div>
                <div className="color-input-container">
                {/* Text Color */}
                <label>Text Color: Left</label>
                <input
                    type="color"
                    name="textColorLeft"
                    value={customStyles.textColorLeft}
                    onChange={handleChange}
                />
                </div>
                <div className="color-input-container">
                <label>Text Color:Right</label>
                <input
                    type="color"
                    name="textColorRight"
                    value={customStyles.textColorRight}
                    onChange={handleChange}
                />
                </div>
                <div className="color-input-container">
                {/* Background Color */}
                <label>Background Color: Left</label>
                <input
                    type="color"
                    name="backgroundColorLeft"
                    value={customStyles.backgroundColorLeft}
                    onChange={handleChange}
                />
                </div>
                <div className="color-input-container">
                <label>Background Color:Right</label>
                <input
                    type="color"
                    name="backgroundColorRight"
                    value={customStyles.backgroundColorRight}
                    onChange={handleChange}
                />
                </div>
                <div className="color-input-container">   
                 <label>skill-tab-color : </label>
                <input
                    type="color"
                    name="skillTabColor"
                    value={customStyles.skillTabColor}
                    onChange={handleChange}
                />
                </div>
            </div>
        </div>
    );
};

export default EditStyle;