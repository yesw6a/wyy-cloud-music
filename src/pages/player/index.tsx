import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PlayArrow as PlayArrowIcon } from "@material-ui/icons";
import { getSongUrl, getSongDetail, getLyric } from "../../stores/SongsStore";
import useRequest from "../../hooks/useRequest";
import PageView from "../../components/PageView";
import parseLyric from "../../lib/parseLyric";
import { isEqual } from "lodash";

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
  const [currentLrcIndex, setCurrentLrcIndex] = useState(0);

  const [requestGetSongUrl, song] = useRequest(getSongUrl);
  const [requestGetSongDetail, detail] = useRequest(getSongDetail);
  const [requestGetLyric, lyricRes] = useRequest(getLyric);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const id = query.get("id");
    requestGetSongUrl({
      query: { id }
    });
    requestGetSongDetail({
      query: { ids: id }
    });
    requestGetLyric({
      query: { id }
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

  const onAudioTimeUpdate = (e: any) => {
    const songTimeStamp = parseInt(e.timeStamp);
    const {
      lrc: { lyric }
    } = lyricRes;
    const lyrics = parseLyric(lyric);
    for (const v of lyrics) {
      if (songTimeStamp > v[0]) {
        console.log(lyrics, v);
        setCurrentLrcIndex(lyrics.indexOf(v));
        return;
      }
    }
  };

  const renderPlayer = () => {
    const { url } = song.data[0];
    const {
      al: { picUrl }
    } = detail.songs[0];

    return (
      <div className="disc-wrapper" onClick={handlePlayerState}>
        {/* 播放媒体标签 */}
        <audio
          ref={audioRef}
          src={url}
          autoPlay
          onTimeUpdate={e => onAudioTimeUpdate(e)}
        />
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

  const renderLyric = () => {
    if (lyricRes) {
      const {
        lrc: { lyric }
      } = lyricRes;
      const lyrics = parseLyric(lyric);
      return (
        <div className="lrc-wrapper">
          {lyrics.map((item, index) => {
            console.log(currentLrcIndex);
            const style = {};
            index === currentLrcIndex &&
              Object.assign(style, { color: "#fff" });
            return (
              <div key={item[0]} style={style}>
                {item[1]}
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>歌词加载中...</div>;
    }
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
      <div className="inner-wrapper">
        {renderPlayer()}
        {renderLyric()}
      </div>
    </PageView>
  );
}

export default Player;
