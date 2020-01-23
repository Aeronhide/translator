import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  ThemeProvider,
  createMuiTheme,
  Container
} from "@material-ui/core";
// import localforage from "localforage";
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
  img: null,
  name: "",
  party: "",
  time: {
    minutes: "",
    seconds: ""
  },
  paused: true
};

const Translator = () => {
  const [playingVideo, setPlayingVideo] = useState(false);
  const [mutedVideo, setMutedVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [speakersList, setSpeakers] = useState([initialSpeakerState]);
  const [speakerIndex, getSpeakerIndex] = useState(null);

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

  const setTime = (data, index) => {
    const localSpeakersList = [...speakersList];
    localSpeakersList[index] = {
      ...localSpeakersList[index],
      time: data
    };
    console.warn({ speakersList, localSpeakersList });
    setSpeakers(localSpeakersList);
  };

  const addSpeaker = () => {
    console.warn("addSpeaker", speakersList);
    setSpeakers([...speakersList, initialSpeakerState]);
  };

  const setPauseTimer = index => {
    getSpeakerIndex(index);
  };

  const setSpeakerData = (data, index) => {
    const localSpeakersList = [...speakersList];
    localSpeakersList[index] = {
      ...data
    };
    setSpeakers(localSpeakersList);
  };

  const removeSpeaker = index => {
    console.warn(index);
    setSpeakers(speakersList.filter((speaker, i) => i !== index));
  };

  const insertGlobalTime = globalTime => {
    setSpeakers(
      speakersList.map(itm => ({
        ...itm,
        time: globalTime
      }))
    );
  };

  useEffect(() => {
    !!newVideoUrl && setVideoUrl(newVideoUrl);
  }, [newVideoUrl, speakersList]);

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
                  setSpeakerTime={setTime}
                  setPaused={setPauseTimer}
                  addSpeaker={addSpeaker}
                  speakersList={speakersList}
                  setSpeakerData={setSpeakerData}
                  initialSpeakerState={initialSpeakerState}
                  activeTimerIndex={speakerIndex}
                  removeSpeaker={removeSpeaker}
                  insertGlobalTimeToSpeakers={insertGlobalTime}
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
                    speakersList={speakersList}
                    activeTimerIndex={speakerIndex}
                    setPaused={setPauseTimer}
                    setSpeakerTime={setTime}
                    index={speakerIndex}
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
