import React from "react";
import ReactPlayer from "react-player";
import TimerComponent from "./settings/timerComponent";

const Video = ({
  playing,
  videoUrl,
  muted,
  speakersList,
  setTime,
  activeTimerIndex,
  setPaused,
  index
}) => {
  const setTimeHandle = time => setTime(time, index);

  const setPausedHandle = () => {
    setPaused(activeTimerIndex === index ? null : index);
  };
  return (
    <div className="player">
      <ReactPlayer url={videoUrl} playing={playing} volume={1} muted={muted} />
      {videoUrl ? (
        <div className="player_footer">
          <div className="tr-single">
            {speakersList.map((speaker, index) => (
              <div className="player-speaker" key={index}>
                <img
                  className="player-speaker_img"
                  src={speaker.img || "http://placehold.it/150"}
                  alt="party-logo"
                />
                <div>|</div>
                <TimerComponent
                  time={speaker.time}
                  setTime={setTimeHandle}
                  setPaused={setPausedHandle}
                  paused={activeTimerIndex !== index}
                  showTime={true}
                  showTimeOver={false}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Video;
