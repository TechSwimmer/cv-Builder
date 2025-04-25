import React from "react";
import Preview from "./Preview";

// import { image } from "html2canvas/dist/types/css/types/image";

    const Layout = ({  handleLayoutClick, handleMouseEnter, handleMouseLeave,images,image }) => {

    
    return (
        <div>
            <div className="layout-switcher">
            
                <button className="layout-btn" onClick={handleLayoutClick} onMouseEnter={handleMouseEnter} >
                    
                <img src={image} className="selected-layout-img" alt="layout" />
                <div className="layout-slider" onMouseLeave={handleMouseLeave}>
                    <button className="layout-option" onClick={() => handleLayoutClick("layout1")}><img src={images.layoutOne} alt="layout 1"/><p>Layout 1</p></button>
                    <button className="layout-option" onClick={() => handleLayoutClick("layout2")}><img src={images.layoutTwo} alt="layout 2"/><p>Layout 2</p></button>
                    <button className="layout-option" onClick={() => handleLayoutClick("layout3")}><img src={images.layoutThree} alt="layout 3"/><p>Layout 3</p></button>
                </div>
                </button>
                
            </div>
            
        </div>
    )
}


export default Layout;