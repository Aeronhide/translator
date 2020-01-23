import React, { useState } from "react";
import { Grid, TextField, Typography, Button, Fab } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import walkingGuy from "../../assets/walkingGuy.gif";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TimerComponent from "./timerComponent";

const Speaker = ({
  setPaused,
  speakerData,
  setSpeakerData,
  index,
  initialSpeakerState,
  setTime,
  activeTimerIndex,
  removeSpeaker
}) => {
  const [data, setData] = useState(initialSpeakerState);
  // const [file, setFile] = useState(null);
  const changeInput = e => {
    const file = e.target.files[0];
    // setFile(URL.createObjectURL(file));
    setData({
      ...data,
      img: URL.createObjectURL(file)
    });
  };

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
    setSpeakerData({ ...data, time: newFormattedTime }, index);
    setData(initialSpeakerState);
  };

  const setTimeHandle = time => setTime(time, index);

  const setPausedHandle = () => {
    setPaused(activeTimerIndex === index ? null : index);
  };

  return (
    <div className="speaker">
      <Grid container>
        <Grid item md={2}>
          <div className="speaker_logo">
            <div className="speaker-upload">
              <label className="speaker-upload_label" htmlFor={`logo${index}`}>
                <EditOutlinedIcon style={{ fontSize: 20 }} />
              </label>
              <input
                id={`logo${index}`}
                className="speaker-upload_field"
                type="file"
                onChange={changeInput}
              />
            </div>
            <img
              className="speaker_logo_img"
              src={
                data.img ||
                (speakerData.img && data.img) ||
                "http://placehold.it/150"
              }
              alt="logo"
            />
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
              setTime={setTimeHandle}
              paused={activeTimerIndex !== index}
              setPaused={setPausedHandle}
              showControls={true}
              showTimeOver={false}
            />
          </div>
        </Grid>
        <Grid item md={4}>
          <div className="speaker_info">
            <Button
              className="remove-speaker-btn"
              variant="outlined"
              onClick={() => removeSpeaker(index)}
            >
              <CloseIcon fontSize="small" />
            </Button>
            <div className="speaker_info_time">
              <Typography className="speaker_info_time_title" variant="h6">
                Speaker time:
              </Typography>
              <div className="speaker_info_time_inner">
                <TimerComponent
                  time={speakerData.time}
                  setTime={setTimeHandle}
                  setPaused={setPausedHandle}
                  paused={activeTimerIndex !== index}
                  showTime={true}
                  showTimeOver={true}
                />
              </div>
            </div>
            <div className="speaker_info_line">
              <Typography variant="h6" className="speaker_info_line_title">
                Name:
              </Typography>
              <Typography variant="h6" className="speaker_info_line_data">
                {speakerData.name
                  ? speakerData.name
                  : data.name.length !== 0
                  ? data.name
                  : "--"}
              </Typography>
            </div>
            <div className="speaker_info_line">
              <Typography variant="h6" className="speaker_info_line_title">
                Party:
              </Typography>
              <Typography variant="h6" className="speaker_info_line_data">
                {speakerData.party
                  ? speakerData.party
                  : data.party.length !== 0
                  ? data.party
                  : "--"}
              </Typography>
            </div>
            {activeTimerIndex === index ? (
              <div className="speaker_info_line">
                <div className="speaker_info_line_status">
                  <img
                    className="speaker_info_line_status_img"
                    src={walkingGuy}
                    alt="speaker"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Speaker;
