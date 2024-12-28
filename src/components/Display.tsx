import { DisplayState, formatTime } from "../helpper";

interface DisplayProps {
  displayState: DisplayState;
  reset: () => void;
  startStop: (displayState: DisplayState) => void;
}

const Display: React.FC<DisplayProps> = ({
  displayState,
  reset,
  startStop,
}) => {
  return (
    <div className="text-center mt-5">
      <h4 id="timer-label" className="text-2xl">
        {displayState.timeType === "session" ? "Session" : "Break"}
      </h4>
      <span
        id="time-left"
        className={`text-2xl ${
          displayState.timerRunning ? "text-red-500" : "text-white"
        }`}
      >
        {formatTime(displayState.time)}
      </span>
      <div className="controls mt-5">
        <button
          id="start_stop"
          onClick={() => startStop(displayState)}
          className="m-5 p-2.5 rounded bg-green-500 text-white cursor-pointer"
        >
          {displayState.timerRunning ? "Stop" : "Start"}
        </button>
        <button
          id="reset"
          onClick={reset}
          className="m-5 p-2.5 rounded bg-green-500 text-white cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Display;
