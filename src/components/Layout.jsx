import React, { useState } from "react";
import Preview from "./Preview";

const Layout = ({ currentLayout, handleLayoutClick, handleMouseEnter, handleMouseLeave }) => {


    return (
        <div>
            <div className="layout-switcher">
                <button className="layout-btn" onClick={handleLayoutClick} onMouseEnter={handleMouseEnter} >
                    {currentLayout}
                </button>
                <div className="layout-slider" onMouseLeave={handleMouseLeave}>
                    <button className="layout-option" onClick={() => handleLayoutClick("layout1")}>Layout 1</button>
                    <button className="layout-option" onClick={() => handleLayoutClick("layout2")}>Layout 2</button>
                    <button className="layout-option" onClick={() => handleLayoutClick("layout3")}>Layout 3</button>
                </div>
            </div>
            
        </div>
    )
}


export default Layout;