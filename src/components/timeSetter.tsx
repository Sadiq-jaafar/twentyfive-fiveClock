import React from "react";

interface TimeSetterProps {
  time: number;
  setTime: (time: number) => void;
  min: number;
  max: number;
  intrval: number;
  type: "break" | "session";
}

const TimeSetter: React.FC<TimeSetterProps> = ({
  time,
  setTime,
  min,
  max,
  intrval,
  type,
}) => {
  const increment = () => {
    if (time + intrval <= max) {
      setTime(time + intrval);
    }
  };

  const decrement = () => {
    if (time - intrval >= min) {
      setTime(time - intrval);
    }
  };

  return (
    <div>
      <button id={`${type}-decrement`} onClick={decrement}>
        -
      </button>
      <span id={`${type}-length`}>{time / 60}</span>
      <button id={`${type}-increment`} onClick={increment}>
        +
      </button>
    </div>
  );
};

export default TimeSetter;
