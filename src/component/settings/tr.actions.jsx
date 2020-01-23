import React, { useState } from "react";
import { Button, Typography, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Speaker from "./speaker";

const Actions = ({
  playFn,
  clearVideo,
  playVal,
  videoUrl,
  setVideoUrl,
  setMP4Video,
  muteVideo,
  muted,
  setPaused,
  addSpeaker,
  speakersList,
  setSpeakerData,
  initialSpeakerState,
  activeTimerIndex,
  setSpeakerTime,
  removeSpeaker,
  insertGlobalTimeToSpeakers
}) => {
  const [globalTime, setGlobalTime] = useState({ minutes: "", seconds: "" });

  const insertGlobalTimeHandle = e =>
    setGlobalTime({
      ...globalTime,
      [e.target.name]: e.target.value
    });

  const setGlobalTimeHandle = () => {
    insertGlobalTimeToSpeakers(globalTime);
    setGlobalTime({ minutes: "", seconds: "" });
  };

  return (
    <div className="controls">
      <div className="controls_section">
        <Typography variant="h6" className="controls_section_title">
          Video:
        </Typography>
        <Button
          variant="contained"
          onClick={clearVideo}
          className="controls_section_btn"
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={playFn}
          className="controls_section_btn"
        >
          {playVal ? "Pause" : "Play"}
        </Button>
        <Button
          variant="contained"
          onClick={setMP4Video}
          className="controls_section_btn"
        >
          MP4
        </Button>
        <TextField
          className="controls_section_field"
          label="Video url"
          type="text"
          value={videoUrl}
          onChange={setVideoUrl}
        />
        <Button
          variant="contained"
          onClick={muteVideo}
          className="controls_section_btn"
        >
          {muted ? "unmute" : "mute"}
        </Button>
      </div>
      <div className="controls_section">
        <div className="speaker_actions_timer-box">
          <TextField
            className="speaker_actions_timer-box_set-field"
            variant="outlined"
            label="Minutes"
            name="minutes"
            size="small"
            onChange={insertGlobalTimeHandle}
            value={globalTime.minutes}
          />
          <TextField
            className="speaker_actions_timer-box_set-field"
            variant="outlined"
            label="Seconds"
            name="seconds"
            size="small"
            onChange={insertGlobalTimeHandle}
            value={globalTime.seconds}
          />
          <Button
            variant="contained"
            size="small"
            className="speaker_actions_timer-box_set-btn"
            onClick={setGlobalTimeHandle}
          >
            Set Global
          </Button>
        </div>
      </div>
      <div className="controls_section">
        <Typography variant="h6" className="controls_section_title">
          Speaker's:
        </Typography>
        {speakersList.map((speaker, index) => (
          <Speaker
            key={index}
            speakerData={speaker}
            time={speaker.time}
            setSpeakerData={setSpeakerData}
            setPaused={setPaused}
            paused={speaker.paused}
            initialSpeakerState={initialSpeakerState}
            index={index}
            activeTimerIndex={activeTimerIndex}
            setTime={setSpeakerTime}
            removeSpeaker={removeSpeaker}
          />
        ))}
        <Button
          className="controls_section_add-btn"
          variant="outlined"
          onClick={addSpeaker}
        >
          <AddIcon fontSize="large" />
        </Button>
      </div>
    </div>
  );
};

export default Actions;
