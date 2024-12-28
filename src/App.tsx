import { useEffect, useState } from "react";
import { DisplayState } from "./helpper";
import TimeSetter from "./components/timeSetter";
import Display from "./components/Display";
import "./App.css";

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  const [breakTime, setBreaktime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: defaultSessionTime,
    timeType: "session",
    timerRunning: false,
  });

  useEffect(() => {
    let timerId: number;
    if (!displayState.timerRunning) return;
    if (displayState.timerRunning) {
      timerId = window.setInterval(decrementDisplay, 1000);
    }
    return () => window.clearInterval(timerId);
  }, [displayState.timerRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.play();
      setDisplayState((prev) => ({
        time: prev.timeType === "session" ? breakTime : sessionTime,
        timeType: prev.timeType === "session" ? "break" : "session",
        timerRunning: true,
      }));
    }
  }, [displayState.time, breakTime, sessionTime]);

  const reset = () => {
    setBreaktime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "session",
      timerRunning: false,
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.currentTime = 0;
    audio.pause();
  };

  const startStop = () => {
    setDisplayState((prev) => ({ ...prev, timerRunning: !prev.timerRunning }));
  };

  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning || time <= 0 || time > 60 * 60) return;
    setBreaktime(time);
  };

  const decrementDisplay = () => {
    setDisplayState((prev) => ({ ...prev, time: prev.time - 1 }));
  };

  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning || time <= 0 || time > 60 * 60) return;
    setSessionTime(time);
    setDisplayState({ time: time, timeType: "session", timerRunning: false });
  };

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col justify-center items-center">
      <div className="flex justify-around text-center w-full">
        <div className="break">
          <h4 id="break-label" className="text-2xl mt-5">
            Break Length
          </h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            intrval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h4 id="session-label" className="text-2xl mt-5">
            Session Length
          </h4>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            intrval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
