import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PlayArrow as PlayArrowIcon } from "@material-ui/icons";
import Audio from "react-player";
import { getSongUrl, getSongDetail, getLyric } from "../../stores/SongsStore";
import useRequest from "../../hooks/useRequest";
import PageView from "../../components/PageView";
import parseLyric from "../../lib/parseLyric";
import px from "../../utils/scalePx";
import BigNumber from "bignumber.js";

import "./style.scss";

const discLightImg = require("../../assets/images/disc_light.png");
const needleImg = require("../../assets/images/needle.png");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Player() {
  const query = useQuery();
  // 歌词延迟 ms
  const lrcOffset = -500;
  // 高亮的歌词行数
  const hightLightRow = 5;

  const [isPause, setIsPause] = useState(false);
  const [animationState, setAnimationState] = useState("running");
  const [currentLrcIndex, setCurrentLrcIndex] = useState(0);
  const [lrcContainerStyle, setLrcContainerStyle] = useState({});
  const [isEnded, setIsEnded] = useState(false);

  const [requestGetSongUrl, song] = useRequest(getSongUrl);
  const [requestGetSongDetail, detail] = useRequest(getSongDetail);
  const [requestGetLyric, lyricRes] = useRequest(getLyric);

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
    if (isPause) {
      setAnimationState("paused");
    } else {
      if (isEnded) {
        setLrcContainerStyle({
          transform: "translateY(0)"
        });
        setIsEnded(false);
      }
      setAnimationState("running");
    }
  }, [isPause]);

  useEffect(() => {
    if (isEnded) {
      setIsPause(true);
    }
  }, [isEnded]);

  const handlePlayerState = () => {
    console.log("click");
    setIsPause(!isPause);
  };

  const onEnded = () => {
    setIsEnded(true);
  };

  const onAudioTimeUpdate = (e: any) => {
    const songTimeStamp = new BigNumber(e.playedSeconds).times(1000).toNumber();
    const {
      lrc: { lyric }
    } = lyricRes;
    const lyrics = parseLyric(lyric);
    const hightLightIndex = hightLightRow - 1;
    const rowHeight = 58;

    for (const v of lyrics) {
      if (songTimeStamp > v[0] + lrcOffset) {
        const index = lyrics.indexOf(v);
        setCurrentLrcIndex(index);
        index > hightLightIndex &&
          setLrcContainerStyle({
            transform: `translateY(${px(
              -rowHeight * index + rowHeight * hightLightIndex
            )})`
          });
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
        {/* 播放音频媒体标签 */}
        <Audio
          url={url}
          playing={!isPause}
          volume={0.45}
          width={0}
          height={0}
          onProgress={e => onAudioTimeUpdate(e)}
          onEnded={onEnded}
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
      const { lrc } = lyricRes;
      const { lyric } = lrc || {};
      const lyrics = parseLyric(lyric);

      return (
        <div className="lrc-wrapper">
          <div className="lrc-container" style={lrcContainerStyle}>
            {lyrics.map((item, index) => {
              const style = {};
              index === currentLrcIndex &&
                Object.assign(style, { color: "#fff" });
              const content = item[1] || <br />;
              return (
                <div key={item[0]} className="lrc-item" style={style}>
                  {content}
                </div>
              );
            })}
          </div>
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
