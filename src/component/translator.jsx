import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  ThemeProvider,
  createMuiTheme,
  Container
} from "@material-ui/core";
// import timerImg1 from "../assets/icon1.png";
// import timerImg2 from "../assets/icon2.png";
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

const Translator = () => {
  const [playingVideo, setPlayingVideo] = useState(false);
  const [mutedVideo, setMutedVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [speakerTime, setSpeakerTime] = useState(null);

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

  const setTime = () => {
    console.warn("set time");
    setSpeakerTime(55000);
  };

  useEffect(() => {
    !!newVideoUrl && setVideoUrl(newVideoUrl);
  }, [newVideoUrl, speakerTime]);

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
