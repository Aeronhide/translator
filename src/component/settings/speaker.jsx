import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Timer from "react-compound-timer";
const NewComponent = props => <div>{props.children}</div>;
const Speaker = () => {
  const [file, setFile] = useState("http://placehold.it/150");
  const changeInput = e => {
    // console.warn(e.target.value);
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));
  };
  return (
    <div className="speaker">
      <Grid container>
        <Grid item md={2}>
          <div className="speaker_logo">
            <div className="speaker-upload">
              <label className="speaker-upload_label" htmlFor="logo1">
                <EditOutlinedIcon style={{ fontSize: 20 }} />
              </label>
              <input
                id="logo1"
                className="speaker-upload_field"
                type="file"
                onChange={changeInput}
              />
            </div>
            <img className="speaker_logo_img" src={file} alt="logo" />
          </div>
        </Grid>
        <Grid item md={6}>
          <div className="speaker_actions">
            <div className="speaker_actions_fields">
              <TextField
                variant="outlined"
                label="Speaker"
                size="small"
                className="speaker_actions_fields_inner"
              />
              <TextField
                variant="outlined"
                label="Party"
                size="small"
                className="speaker_actions_fields_inner"
              />
            </div>
            <div className="speaker_actions_timer-box">
              <TextField
                className="speaker_actions_timer-box_set-field"
                variant="outlined"
                label="Time"
                size="small"
              />
              <Timer
                initialTime={60000}
                lastUnit="h"
                timeToUpdate={1}
                direction="backward"
                startImmediately={false}
              >
                {({ start, pause, reset }) => {
                  return (
                    <React.Fragment>
                      <div className="speaker_actions_timer-box_display">
                        <Timer.Minutes /> m
                        <Timer.Seconds /> s
                      </div>
                      <div className="speaker_actions_timer-box_controls">
                        <Button
                          onClick={start}
                          variant="contained"
                          className="speaker_actions_timer-box_controls_btn"
                        >
                          set
                        </Button>
                        <Button
                          onClick={reset}
                          variant="contained"
                          className="speaker_actions_timer-box_controls_btn"
                        >
                          reset
                        </Button>
                        <Button
                          onClick={start}
                          variant="contained"
                          className="speaker_actions_timer-box_controls_btn"
                        >
                          start
                        </Button>
                        <Button
                          onClick={pause}
                          variant="contained"
                          className="speaker_actions_timer-box_controls_btn"
                        >
                          pause
                        </Button>
                      </div>
                    </React.Fragment>
                  );
                }}
              </Timer>
            </div>
          </div>
        </Grid>
        <Grid item md={4}>
          <div className="speaker_info">
            <NewComponent />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Speaker;
