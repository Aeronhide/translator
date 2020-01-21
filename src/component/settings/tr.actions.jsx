import React from "react";
import { Button, Typography, TextField } from "@material-ui/core";
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
  speakerTime,
  setSpeakerTime,
  startTimer,
  resetTimer,
  pauseTimer
}) => (
  <div className="controls">
    {console.warn("tr.actions", speakerTime)}
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
      <Typography variant="h6" className="controls_section_title">
        Speaker's:
      </Typography>
      <Speaker time={speakerTime} setTime={setSpeakerTime} />
    </div>
  </div>
);

export default Actions;
