import React, { useState } from "react";
import Select from "react-select";
import "../styles/editStyle.css";
// import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";

const EditStyle = ({ customStyles, setCustomStyles, updateStyles, onSubmit }) => {

    const fontOptions = [
        { label: "Lucida Console", value: "Lucida Console, monospace" },
  { label: "Consolas", value: "Consolas, monospace" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "DejaVu Sans Mono", value: "DejaVu Sans Mono, monospace" },
  { label: "Ubuntu Mono", value: "Ubuntu Mono, monospace" },
  { label: "Fira Code", value: "Fira Code, monospace" },
  { label: "Source Code Pro", value: "Source Code Pro, monospace" },
  { label: "Inconsolata", value: "Inconsolata, monospace" },
  { label: "Menlo", value: "Menlo, monospace" },
  { label: "JetBrains Mono", value: "JetBrains Mono, monospace" },
  { label: "Roboto Mono", value: "Roboto Mono, monospace" },
    ];

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
            <div style={{ height: "210px", flexShrink: 0 }} />
                <h2>Edit Style</h2>

                {/* Font Size */}
                <div className="font-input-container">
                    <label>Font Size: (Headers)</label>
                    <input
                        type="number"
                        name="fontHeaderSize"
                        value={fontSizeValueHeaders}
                        onChange={handleChange}
                        min="26"
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
                        min="18"
                        max="26"
                    />
                </div>
                <div className="font-input-container">
                    <label>Font Family:</label>
                    <Select
                        options={fontOptions}
                        value={fontOptions.find(opt => opt.value === customStyles.fontFamily)}
                        onChange={(selectedOption) =>
                            setCustomStyles(prev => ({ ...prev, fontFamily: selectedOption.value }))
                        }
                        getOptionLabel={e => (
                            <div style={{ fontFamily: e.value }}>{e.label}</div>
                        )}
                    />
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
                    <label>skill-tab-color : BG</label>
                    <input
                        type="color"
                        name="skillTabColor"
                        value={customStyles.skillTabColor}
                        onChange={handleChange}
                    />
                </div>
                <div className="color-input-container">
                    {/* Background Color */}
                    <label>skill-tab-color: text</label>
                    <input
                        type="color"
                        name="textColorSkillTab"
                        value={customStyles.textColorSkillTab}
                        onChange={handleChange}
                    />
                </div>
                
            </div>
            <div className="form-section-btn">
                <button className="submit-btn" onClick={onSubmit}>
                    Full Screen Preview
                </button>
            </div>
        </div>
    );
};

export default EditStyle;