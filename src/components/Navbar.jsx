import React from "react";

const Navbar = ({activeTab, setActiveTab, handleStylePage, currentLayout}) => {


        return (
            <nav className="cv-navbar">
                <button
                    className={activeTab == "content" ? "active" : ""}
                    onClick={() => {setActiveTab("content");
                        handleStylePage(currentLayout); 
                    }}
                >
                    Edit Content
                </button>
                <button
                    className={activeTab == "style" ? "active" : ""}
                    onClick={() => {setActiveTab("style")
                        handleStylePage(currentLayout); 
                    }}
                >
                    Edit Style
                </button>
            </nav>
        )
}



export default Navbar;