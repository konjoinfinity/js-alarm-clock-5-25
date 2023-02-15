import Countdown from "https://cdn.skypack.dev/react-countdown@2.3.5";
import CountdownApi from "https://cdn.skypack.dev/react-countdown@2.3.5";

function App(){
  const [breakl, setBreakl] = React.useState(5)
  const [session, setSession] = React.useState(25)
  const [timer, setTimer] = React.useState(Date.now() + (session * 60000))
  const [date, setDate] = React.useState()
  const [breakTimer, setBreakTimer] = React.useState(Date.now() + (breakl * 60000))
  const [showBreakTimer, setShowBreakTimer] = React.useState(false)
  const breakButton = React.useRef(null);
  
  function start(){
  setTimer(Date.now() + (session * 60000))
  }
  
  function incDec(which, func, op){
    let newVal = eval(which + op + 1)
    if(which > 1 && which < 60) {
      func(newVal)
    if(which === session){
      setTimer(Date.now() + (eval(session + op + 1) * 60000))
    }
    }
    else if(which === 1 && op === '+'){
      func(newVal)
      if(which === session){
      setTimer(Date.now() + (eval(session + op + 1) * 60000))
    }
    } else if(which === 60 && op === '-'){
      func(newVal)
      if(which === session){
      setTimer(Date.now() + (eval(session + op + 1) * 60000))
    }
    }
  }
  
  function reset(){
    let stopAlarm = document.getElementById('beep'); 
    setShowBreakTimer(false)
    stopAlarm.pause(); 
    stopAlarm.currentTime = 0;
    setBreakl(5); setSession(25); setTimer(Date.now() + (25 * 60000)); setBreakTimer(Date.now() + (5 * 60000));
  }
  
  function breakTime(){
    console.log('break')
    var alarm = document.getElementById('beep')
    alarm.play();
    setTimeout(() => {
    setBreakTimer(Date.now() + (breakl * 60000))
    setShowBreakTimer(true)
    let startBreak = document.getElementById('startBreak');
    startBreak.click();
    }, 1000)
  }
  
  function sessionTime(){
    console.log('session')
    let alarm = document.getElementById('beep')
    alarm.play();
    setTimeout(() => {
    setTimer(Date.now() + (session * 60000))
    setShowBreakTimer(false)
    let startSession = document.getElementById('start_stop');
    startSession.click();
    }, 1000)
  }
  
  const renderer = ({ api, formatted }) => {
    const { hours, minutes, seconds } = formatted;
    const completed = api.isCompleted();
    return (
      <div>
        <span id="time-left" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: 40}}>
          {hours == "01" ? 60 : minutes}:{seconds}
        </span>
        <div style={{margin: 20}}>
          <div style={{display: 'flex',flexDirection: 'row'}}> 
          <button id='start_stop' onClick={()=>{api.isStarted() ? api.pause() : api.start()}} style={{height: 50, width: 160, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Start/Stop
            </button>
            </div>
           
          <div style={{display: 'flex',flexDirection: 'row'}}> 
          <button id="reset" onClick={()=>{reset(); api.stop()}} style={{height: 50, width: 160, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Reset</button>
            </div>
        </div>
      </div>
    );
  };
  
   const breakRenderer = ({ api, formatted }) => {
    const { hours, minutes, seconds } = formatted;
    const completed = api.isCompleted();
    return (
      <div>
        <span id="time-left" style={{display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize: 40}}>
          {minutes}:{seconds}
        </span>
        <div style={{margin: 20}}>
          <div style={{display: 'flex',flexDirection: 'row'}}> 
          <button ref={breakButton} id="startBreak" onClick={()=>{api.isStarted() ? api.pause() : api.start()}} style={{height: 50, width: 160, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Start/Stop
            </button>
            </div>
          <div style={{display: 'flex',flexDirection: 'row'}}> 
          <button id="reset" onClick={()=>{reset(); api.stop()}} style={{height: 50, width: 160, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Reset</button>
            </div>
        </div>
      </div>
    );
  };
  
  return(
    <div style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
      <audio id='beep' className='clip' src={'https://cdn.pixabay.com/download/audio/2022/01/18/audio_ca056138e2.mp3?filename=alarm-no3-14864.mp3'}></audio>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 450, width: 900, backgroundColor: '#e5e5e5', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px', borderRadius: 8, padding: 10, margin:10}}>
    <p style={{fontSize: 35}}>5 + 25 Clock</p>
     <div style={{display: 'flex', flexDirection: 'row'}}>
       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 200, width: 225, backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px', borderRadius: 8, padding: 25, margin:20}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        
      <div id="break-label" style={{padding: 25, fontSize: 25}}>Break Length</div>
        <div id="break-length" style={{ fontSize: 25, display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>{breakl}</div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <button id="break-decrement" style={{height: 50, width: 50, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 8}} onClick={()=>incDec(breakl, setBreakl, '-')}>-</button>
        <button id="break-increment" style={{height: 50, width: 50, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={()=> incDec(breakl, setBreakl, '+')}>+</button>
      </div>
         </div>
        </div>
    <div style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px', borderRadius: 8, padding: 25, margin:20, backgroundColor:'#fff', fontSize: 25, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <div id="timer-label" style={{paddingBottom: 10, fontSize: 25}}>{showBreakTimer ? 'Break Started' : 'Session'}</div>
      {showBreakTimer ? <Countdown date={breakTimer} renderer={breakRenderer} autoStart={false} onComplete={()=>sessionTime()} /> :
       <Countdown date={timer} renderer={renderer} autoStart={false} onComplete={()=>breakTime()} />}
    </div>
     <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      </div>
        <div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 200, width: 225, backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px', borderRadius: 8, padding: 25, margin:20}}>
           <div style={{display: 'flex', flexDirection: 'column'}}>
             
       <div id="session-label" style={{padding: 25, fontSize: 25}}>Session Length</div>
              <div id="session-length" style={{ fontSize: 25, display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>{session}</div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <button id="session-decrement" style={{height: 50, width: 50, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 8}} onClick={()=>incDec(session, setSession, '-')}>-</button>
        <button id="session-increment" style={{height: 50, width: 50, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={()=>incDec(session, setSession, '+')}>+</button>
      </div>
         </div>
            </div>
        <div>
      </div>
     </div>
      </div>
      </div>
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
