import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TimerComponent from "./timerComponent";

const initialSpeakerState = {
  name: "",
  party: "",
  time: {
    minutes: "",
    seconds: ""
  }
};

const Speaker = ({ paused, setPaused, speakerData, setSpeakerData, index }) => {
  const [file, setFile] = useState("http://placehold.it/150");
  const changeInput = e => {
    const file = e.target.files[0];
    setFile(URL.createObjectURL(file));
  };
  const [] = useState({
    name: ""
  });
  // const [newTime, setNewTime] = useState();
  const [data, setData] = useState(initialSpeakerState);

  const insertNewTime = e => {
    const { name, value } = e.target;
    setData({
      ...data,
      time: {
        ...data.time,
        [name]: value
      }
    });
  };

  const infoOnChange = e => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const setInsertedData = () => {
    const newFormattedTime = {};
    Object.keys(data.time).forEach(key => {
      if (!data.time[key]) {
        newFormattedTime[key] = 0;
      } else {
        newFormattedTime[key] = parseInt(data.time[key], 10);
      }
    });
    setSpeakerData(data, index);
    setData(initialSpeakerState);
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
                name="name"
                value={data.name === null ? speakerData.name : data.name}
                onChange={infoOnChange}
              />
              <TextField
                variant="outlined"
                label="Party"
                size="small"
                className="speaker_actions_fields_inner"
                name="party"
                value={data.party === null ? speakerData.party : data.party}
                onChange={infoOnChange}
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
                value={
                  data.time.minutes === null
                    ? speakerData.time.minutes
                    : data.time.minutes
                }
              />
              <TextField
                className="speaker_actions_timer-box_set-field"
                variant="outlined"
                label="Seconds"
                name="seconds"
                size="small"
                onChange={insertNewTime}
                value={
                  data.time.seconds === null
                    ? speakerData.time.seconds
                    : data.time.seconds
                }
              />
              <Button
                variant="contained"
                size="small"
                className="speaker_actions_timer-box_set-btn"
                onClick={setInsertedData}
              >
                Set
              </Button>
            </div>
            <TimerComponent
              time={speakerData.time}
              setTime={() => null}
              paused={paused}
              setPaused={setPaused}
              showControls={true}
            />
          </div>
        </Grid>
        <Grid item md={4}>
          <div className="speaker_info">
            <div className="speaker_info_time">
              <Typography className="speaker_info_time_title" variant="h6">
                Speaker time:
              </Typography>
              <div className="speaker_info_time_inner">
                <TimerComponent
                  time={speakerData.time}
                  setTime={() => null}
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
