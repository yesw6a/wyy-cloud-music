import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  PlayArrow as PlayArrowIcon,
  PlayCircleOutlineOutlined as PlayCircleOutlineOutlinedIcon
} from "@material-ui/icons";
import Audio from "react-player";
import BigNumber from "bignumber.js";
import {
  getSongUrl,
  getSongDetail,
  getLyric,
  getSimiPlayList,
  getSimiSongs
} from "../../stores/SongsStore";
import useRequest from "../../hooks/useRequest";
import PageView from "../../components/PageView";
import parseLyric from "../../lib/parseLyric";
import px from "../../utils/scalePx";
import UnitConversion from "../../lib/unitConversion";

import "./style.scss";

const discLightImg = require("../../assets/images/disc_light.png");
const needleImg = require("../../assets/images/needle.png");

interface SimiPlayListProps {
  id: number;
  name: string;
  playCount: number;
  coverImgUrl: string;
  creator: {
    nickname: string;
    vipType: number;
  };
}

interface SimiSongsProps {
  id: number;
  name: string;
  alias: Array<object>;
  album: {
    name: string;
    picUrl: string;
  };
  artists: [
    {
      name: string;
    }
  ];
}

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
  const [requestGetSimiPlayList, simiPlayList] = useRequest(getSimiPlayList);
  const [requestGetSimiSongs, simiSongs] = useRequest(getSimiSongs);

  useEffect(() => {
    const id = query.get("id");

    requestGetSongUrl({ query: { id } });
    requestGetSongDetail({ query: { ids: id } });
    requestGetLyric({ query: { id } });
    requestGetSimiPlayList({ query: { id } });
    requestGetSimiSongs({ query: { id } });
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
          onProgress={(e: any) => onAudioTimeUpdate(e)}
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

  // 包含这首歌的歌单
  const renderMoreList = () => {
    if (simiPlayList) {
      const { playlists } = simiPlayList;
      return (
        !!playlists.length && (
          <div className="more-list-wrapper">
            <div className="title">包含这首歌的歌单</div>
            <div className="lists">
              {playlists.map(
                ({
                  id,
                  name,
                  playCount,
                  coverImgUrl,
                  creator: { nickname, vipType }
                }: SimiPlayListProps) => {
                  return (
                    <div key={id} className="more-list-item">
                      <div className="card">
                        <img src={coverImgUrl} className="img" />
                        <span className="play-count">
                          {UnitConversion(playCount)}
                        </span>
                      </div>
                      <div className="name">{name}</div>
                      <div className="author-row">
                        <span className="author">
                          by {nickname}
                          {vipType === 11 && <span className="tag-daren" />}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )
      );
    }
  };

  // 喜欢这首歌的人也听
  const renderSongs = () => {
    if (simiSongs) {
      const { songs } = simiSongs;
      return (
        !!songs.length && (
          <div className="more-songs-wrapper">
            <div className="title">喜欢这首歌的人也听</div>
            <div className="list">
              {songs.map(
                ({
                  id,
                  name,
                  alias,
                  album: { name: albumName, picUrl },
                  artists: [{ name: artistsName }]
                }: SimiSongsProps) => {
                  return (
                    <div className="item-wrapper">
                      <img src={picUrl} className="cover-img" />
                      <div className="song-info">
                        <div className="song-name">
                          <span className="name">{name}</span>
                          {Array.isArray(alias) && !!alias.length && (
                            <span className="info">({alias[0]})</span>
                          )}
                        </div>
                        <div className="author">
                          {artistsName} - {albumName}
                        </div>
                      </div>
                      <div className="play">
                        <PlayCircleOutlineOutlinedIcon className="icon-play" />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )
      );
    }
  };

  if (!song || !detail) {
    return <div>页面加载中...</div>;
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
        {renderMoreList()}
        {renderSongs()}
      </div>
    </PageView>
  );
}

export default Player;
