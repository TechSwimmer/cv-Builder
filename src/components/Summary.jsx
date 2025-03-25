const Summary = ({data, setData}) => {


    return(
        <div className="summary-container">
            <h3>PROFILE</h3>
            <textarea type="text" 
            placeholder="Summary" 
            value={data.summary} 
            onChange={(e) => setData({...data, summary: e.target.value})} />
        </div>
    )
}


export default Summary;