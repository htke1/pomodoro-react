
import './App.css';
import {useState} from 'react'
import Length from './components/Length'
function App() {
const [displayTime,setDisplayTime] = useState(1*60);
const [breakMin,setBreakMin] = useState(5*60);
const [timerMin, setTimerMin] = useState(1*60);
const [timerOn, setTimerOn] = useState(false);
const[intervalId, setIntervalId] = useState(null);
const [currentSession, setCurrentSession] = useState('timer')
const [message, setMessage] = useState("");
const formatTime=(time)=>{
let minutes = Math.floor(time/60);
let seconds = time%60;
return(
  (minutes<10?"0"+minutes:minutes)+":"+(seconds<10?"0"+seconds:seconds)
)
}

const handleStart=()=>{

  setTimerOn(!timerOn)
 console.log(timerOn)
  if(timerOn){
    clearInterval(intervalId)
  }
  else {
    const newInterval = setInterval(()=>{
      
       setDisplayTime(prev=>{
         const timeLeft = prev-1;
        if(timeLeft>=0){ 
        return prev-1}
        if(currentSession === 'timer'){
          setDisplayTime(breakMin)
          setCurrentSession('break');
        }
        else if(currentSession === 'break'){
          setDisplayTime(timerMin)
          setCurrentSession('timer');
          setMessage('BreakTime')
      
       }
      })
        
     
    },100);
  setIntervalId(newInterval)
  }
  

}

function handleReset(){
  setDisplayTime(25*60);
  setTimerMin(25*60);
  setBreakMin(5*60);
  
}

const changeTime=(aMinute, type)=>{

if(type==="break"){
if(breakMin<=60 && aMinute < 0)
{
  return;
}
setBreakMin((prev)=>prev+aMinute);
}
else
{
  if(timerMin<=60 && aMinute < 0){
    return;
  }
setTimerMin((prev)=>prev+aMinute);

if(!timerOn){
  setDisplayTime(timerMin+aMinute)
}
}}

  return (
   <div className="app">
     {console.log(timerOn)}
     <p>{message}</p>
    {formatTime(displayTime)}
    <button onClick={handleStart}>{!timerOn?"play":"pause"}</button>
    <button onClick={handleReset}>reset</button>
    <Length type="break" time={breakMin}  changeTime={changeTime} formatTime={formatTime}/>
    <Length type="timer" time={timerMin}  changeTime={changeTime} formatTime={formatTime}/>
 </div>
  )
}

export default App;
