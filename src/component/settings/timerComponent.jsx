import React, { useState, useEffect, Fragment } from "react";
import { Button } from "@material-ui/core";

const TimerComponent = ({ currentTime }) => {
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [time, setTime] = useState({
    hours: currentTime && currentTime.h,
    minutes: currentTime && currentTime.m,
    seconds: currentTime && currentTime.s
  });
  console.warn(currentTime);
  const tick = () => {
    if (paused || over) return;
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0)
      setOver(true);
    else if (time.minutes === 0 && time.seconds === 0)
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59
      });
    else if (time.seconds === 0)
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    else
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
  };

  const reset = () => {
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    setPaused(false);
    setOver(false);
  };

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div className="countdown">
      <div className="countdown_time">
        <div>{time.minutes}</div>
        <Fragment>{time.hours.toString().padStart(2, "0")}</Fragment>:
        <Fragment>{time.minutes.toString().padStart(2, "0")}</Fragment>:
        <Fragment>{time.seconds.toString().padStart(2, "0")}</Fragment>
      </div>
      <div>{over ? "Time's up!" : ""}</div>
      <Button onClick={() => setPaused(!paused)}>
        {paused ? "Resume" : "Pause"}
      </Button>
      <Button onClick={() => reset()}>Restart</Button>
    </div>
  );
};

export default TimerComponent;
