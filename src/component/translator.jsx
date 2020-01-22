import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  ThemeProvider,
  createMuiTheme,
  Container
} from "@material-ui/core";
import localforage from "localforage";
import Video from "./tr.player";
import Actions from "./settings/tr.actions";
import "./styles.sass";

const font_weight = { fontWeight: 600 };

const theme = createMuiTheme({
  typography: {
    h2: font_weight,
    h4: font_weight,
    body1: font_weight,
    subtitle1: font_weight
  }
});
const initialSpeakerState = {
  name: "",
  party: "",
  time: {
    minutes: "",
    seconds: ""
  },
  paused: false
};

const Translator = () => {
  const [playingVideo, setPlayingVideo] = useState(false);
  const [mutedVideo, setMutedVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [speakerTime, setSpeakerTime] = useState({
    // hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [paused, setPaused] = useState(true);
  const [active, setActive] = useState(null);
  const [speakersList, setSpeakers] = useState([initialSpeakerState]);

  const changeVideoOnMp4 = () => {
    setVideoUrl(require("../assets/video1.mp4"));
    setNewVideoUrl("");
  };

  const changeVideoOnLink = e => {
    setNewVideoUrl(e.target.value);
  };

  const stopVideo = () => {
    setNewVideoUrl("");
    setVideoUrl(null);
    setPlayingVideo(false);
  };

  const setTime = data => {
    setSpeakerTime(data);
  };

  const setPauseTimer = () => {
    setActive(null);
  };

  const addSpeaker = () => {
    setSpeakers([...speakersList, initialSpeakerState]);
  };

  useEffect(() => {
    !!newVideoUrl && setVideoUrl(newVideoUrl);
  }, [newVideoUrl, speakerTime]);

  const setSpeakerData = (data, index) => {
    console.warn(data, index);
    const localSpeakersList = [...speakersList];
    localSpeakersList[index] = {
      ...data
    };
    setSpeakers(localSpeakersList);
  };

  console.warn(speakersList);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <div className="tr">
          <Grid container>
            <Grid item md={7} xs={12}>
              <div className="tr_actions">
                <Typography variant="h4" className="section-title">
                  Settings
                </Typography>
                <Actions
                  playVal={playingVideo}
                  playFn={() => setPlayingVideo(!playingVideo)}
                  videoUrl={newVideoUrl}
                  setVideoUrl={changeVideoOnLink}
                  setMP4Video={changeVideoOnMp4}
                  clearVideo={stopVideo}
                  muted={mutedVideo}
                  muteVideo={() => setMutedVideo(!mutedVideo)}
                  speakerTime={speakerTime}
                  setSpeakerTime={setTime}
                  paused={paused}
                  setPaused={setPauseTimer}
                  addSpeaker={addSpeaker}
                  speakersList={speakersList}
                  setSpeakerData={setSpeakerData}
                />
              </div>
            </Grid>
            <Grid item md={5} xs={12}>
              <div className="tr_video">
                <Typography variant="h4" className="section-title">
                  Translator
                </Typography>
                <div className="tr_video_box">
                  <Video
                    videoUrl={videoUrl}
                    playing={playingVideo}
                    muted={mutedVideo}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Translator;
