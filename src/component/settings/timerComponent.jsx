import React from "react";
import { Button } from "@material-ui/core";
import Timer from "react-compound-timer";

const TimerComponent = ({
  time,
  showControls,
  showTime,
  startFn,
  resetFn,
  pauseFn
}) => (
  <Timer
    initialTime={time && 0}
    lastUnit="h"
    timeToUpdate={1}
    direction="backward"
    startImmediately={false}
  >
    {({ start, pause, reset }) => {
      return (
        <React.Fragment>
          {showTime ? (
            <div className="speaker_actions_timer-box_display">
              <Timer.Minutes /> m {""}
              <Timer.Seconds /> s
            </div>
          ) : (
            ""
          )}
          {showControls ? (
            <div className="speaker_actions_timer-box_controls">
              <Button
                onClick={() => resetFn(reset)}
                variant="contained"
                className="speaker_actions_timer-box_controls_btn"
              >
                reset
              </Button>
              <Button
                onClick={() => startFn(start)}
                variant="contained"
                className="speaker_actions_timer-box_controls_btn"
              >
                start
              </Button>
              <Button
                onClick={() => pauseFn(pause)}
                variant="contained"
                className="speaker_actions_timer-box_controls_btn"
              >
                pause
              </Button>
            </div>
          ) : (
            ""
          )}
        </React.Fragment>
      );
    }}
  </Timer>
);

export default TimerComponent;
