import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

const Timer = ({ timerLen, onExpire, autoStart }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: () => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + timerLen);
      return time;
    },
    onExpire: () => {
      restart();
      onExpire();
    },
    autoStart,
  });

  return (
    <>
      <h1 className="text-8xl font-bold">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <button
        className="border border-black p-2 rounded-xl"
        onClick={isRunning ? pause : resume}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </>
  );
};

export default Timer;
