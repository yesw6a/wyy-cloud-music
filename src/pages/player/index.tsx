import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PlayArrow as PlayArrowIcon } from "@material-ui/icons";
import { getSongUrl, getSongDetail } from "../../stores/SongsStore";
import useRequest from "../../hooks/useRequest";
import PageView from "../../components/PageView";

import "./style.scss";

const discLightImg = require("../../assets/images/disc_light.png");
const needleImg = require("../../assets/images/needle.png");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Player() {
  const query = useQuery();

  const [isPause, setIsPause] = useState(false);
  const [animationState, setAnimationState] = useState("running");

  const [requestGetSongUrl, song] = useRequest(getSongUrl);
  const [requestGetSongDetail, detail] = useRequest(getSongDetail);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const id = query.get("id");
    requestGetSongUrl({
      query: { id }
    });
    requestGetSongDetail({
      query: { ids: id }
    });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audioRefCurrent = audioRef.current;
      if (isPause) {
        audioRefCurrent.pause();
        setAnimationState("paused");
        console.log("paused");
      } else {
        audioRefCurrent.play();
        setAnimationState("running");
        console.log("playing");
      }
    }
  }, [isPause]);

  const handlePlayerState = () => {
    console.log("click");
    setIsPause(!isPause);
  };

  const renderPlayer = () => {
    const { url } = song.data[0];
    const {
      al: { picUrl }
    } = detail.songs[0];

    return (
      <div className="disc-wrapper" onClick={handlePlayerState}>
        {/* 播放媒体标签 */}
        <audio ref={audioRef} src={url} autoPlay />
        <img src={needleImg} className="needle" />
        <div className="disc">
          <div className="disc-turn">
            {isPause && <PlayArrowIcon className="play-btn" />}
            <img
              src={picUrl}
              className="album-img"
              style={{ animationPlayState: animationState }}
            />
            <img
              src={discLightImg}
              className="disc-light"
              style={{ animationPlayState: animationState }}
            />
          </div>
        </div>
      </div>
    );
  };

  if (!song || !detail) {
    return <div>加载中...</div>;
  }

  return (
    <PageView className="player-wrapper">
      <div
        style={{ backgroundImage: `url(${detail.songs[0].al.picUrl})` }}
        className="bg"
      />
      <div className="inner-wrapper">{renderPlayer()}</div>
    </PageView>
  );
}

export default Player;
