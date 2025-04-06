import React from "react";

const Navbar = ({activeTab, setActiveTab}) => {
        return (
            <nav className="cv-navbar">
                <button
                    className={activeTab == "content" ? "active" : ""}
                    onClick={() => setActiveTab("content")}
                >
                    Edit Content
                </button>
                <button
                    className={activeTab == "style" ? "active" : ""}
                    onClick={() => setActiveTab("style")}
                >
                    Edit Style
                </button>
            </nav>
        )
}



export default Navbar;