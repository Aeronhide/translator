import React, { useState, useEffect, Fragment } from "react";
import { Button } from "@material-ui/core";

const TimerComponent = ({
  time,
  setTime,
  paused,
  setPaused,
  showControls,
  showTime,
  showTimeOver
}) => {
  const [over, setOver] = useState(false);
  const tick = () => {
    if (paused) return;
    // time.hours === 0 &&
    if (time.minutes === 0 && time.seconds === 0) {
      setPaused();
      // paused && setOver(true);
      // } else if (time.minutes === 0 && time.seconds === 0) {
      //   setTime({
      //     hours: time.hours - 1,
      //     minutes: 59,
      //     seconds: 59
      //   });
    } else if (time.seconds === 0) {
      setTime({
        // hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    } else {
      setTime({
        // hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
    }
  };
  const reset = () => {
    setTime({
      // hours: 0,
      minutes: 0,
      seconds: 0
    });
  };
  useEffect(() => {
    let timerID;
    if (!paused) {
      timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }
    if (time.minutes === 0 && time.seconds === 0 && paused) {
      setOver(true);
    } else {
      setOver(false);
    }
  }, [paused, setOver, time.minutes, time.seconds]);

  return (
    <div className="countdown">
      {showTime ? (
        <div className="countdown_time">
          <div className="countdown_time_inner">
            <Fragment>
              {time && time.minutes.toString().padStart(2, "0")}
            </Fragment>
            :
            <Fragment>
              {time && time.seconds.toString().padStart(2, "0")}
            </Fragment>
          </div>
          {showTimeOver ? (
            <div className="countdown_time_over">
              {over ? "Time's up!" : ""}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {showControls ? (
        <div className="countdown_controls">
          <Button
            className="countdown_controls_btns"
            variant="contained"
            onClick={setPaused}
          >
            {paused ? "Start" : "Pause"}
          </Button>
          <Button
            className="countdown_controls_btns"
            variant="contained"
            onClick={reset}
          >
            reset
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TimerComponent;
