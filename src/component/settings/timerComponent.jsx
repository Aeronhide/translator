import React, { useState, useEffect, Fragment } from "react";
import { Button } from "@material-ui/core";

const TimerComponent = ({
  time,
  setTime,
  paused,
  setPaused,
  showControls,
  showTime
}) => {
  const [over, setOver] = useState(false);

  const tick = () => {
    // if (paused || over) return;
    // time.hours === 0 &&
    console.warn(time.minutes, time.seconds);
    if (time.minutes === 0 && time.seconds === 0) {
      console.warn("1231");
      setOver(true);
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
    if (paused) {
      let timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }
  });

  return (
    <div className="countdown">
      {showTime ? (
        <Fragment>
          <div className="countdown_time">
            <Fragment>
              {time && time.minutes.toString().padStart(2, "0")}
            </Fragment>
            :
            <Fragment>
              {time && time.seconds.toString().padStart(2, "0")}
            </Fragment>
          </div>
          <div>{over ? "Time's up!" : ""}</div>
        </Fragment>
      ) : (
        ""
      )}
      {showControls ? (
        <Fragment>
          <Button
            className="countdown_btn"
            variant="contained"
            onClick={setPaused}
          >
            {paused ? "Pause" : "Start"}
          </Button>
          <Button className="countdown_btn" variant="contained" onClick={reset}>
            reset
          </Button>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default TimerComponent;
