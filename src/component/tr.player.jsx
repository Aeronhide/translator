import React from "react";
import ReactPlayer from "react-player";

const Video = ({ playing, videoUrl, muted }) => (
  <ReactPlayer url={videoUrl} playing={playing} volume={1} muted={muted} />
);

export default Video;
