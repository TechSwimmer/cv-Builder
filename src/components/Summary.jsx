import React, { useState } from "react";


const Summary = ({ data = {}, setData, visible, setVisible }) => {

    // summary data
    const [summary = {}, setSummary] = useState({ summary: "" });

    return (
        <div className="summary-container">
            <div className="toggle-visibility">
                <label>Show Profile Section</label>
                    <input
                        type="checkbox"
                        checked={visible}
                        onChange={(e) => setVisible(e.target.checked)}
                    />
                    
                
            </div>
            {visible && (
                <>
                    <h3>PROFILE</h3>
                    <textarea type="text"
                        placeholder="Summary"
                        value={data.summary}
                        onChange={(e) => setData({ ...data, summary: e.target.value })} />
                </>
            )}

        </div>
    )
}


export default Summary;