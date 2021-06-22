const Length = (props) =>{
return(
    <div className="timer-setting">
        <button onClick={()=>props.changeTime(-60,props.type)}>-</button>
        <h3>{props.formatTime(props.time)}</h3>
        <button onClick={()=>props.changeTime(60,props.type)}>+</button></div>
    
)
}

export default Length;