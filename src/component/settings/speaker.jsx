import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TimerComponent from "./timerComponent";

const Speaker = ({ time, setTime, paused, setPaused }) => {
  const [file, setFile] = useState("http://placehold.it/150");
  const changeInput = e => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));
  };
  const [newTime, setNewTime] = useState({
    minutes: "",
    seconds: ""
  });

  const insertNewTime = e => {
    const { name, value } = e.target;
    setNewTime({
      ...newTime,
      [name]: value
    });
  };
  const setInsertedTime = () => {
    setTime(newTime);
    setNewTime({
      minutes: "",
      seconds: ""
    });
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
                label="Minutes"
                name="minutes"
                size="small"
                onChange={insertNewTime}
                value={newTime.minutes}
              />
              <TextField
                className="speaker_actions_timer-box_set-field"
                variant="outlined"
                label="Seconds"
                name="seconds"
                size="small"
                onChange={insertNewTime}
                value={newTime.seconds}
              />
              <Button
                variant="contained"
                className="speaker_actions_timer-box_set-btn"
                onClick={setInsertedTime}
              >
                Set
              </Button>
            </div>
            <TimerComponent
              time={time}
              setTime={setTime}
              paused={paused}
              setPaused={setPaused}
              showControls={true}
            />
          </div>
        </Grid>
        <Grid item md={4}>
          <div className="speaker_info">
            <div className="speaker_info_time">
              <Typography className="speaker_info_time_title " variant="h6">
                Speaker time:
              </Typography>
              <div className="speaker_info_time_inner">
                <TimerComponent
                  time={time}
                  setTime={setTime}
                  setPaused={setPaused}
                  paused={paused}
                  showTime={true}
                />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Speaker;
