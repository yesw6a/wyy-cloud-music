import React, { useEffect } from "react";
import { getPersonalizedNewSong } from "../../../../../stores/SongsStore";
import useRequest from "../../../../../hooks/useRequest";
import { PlayCircleOutlineOutlined } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import "./style.scss";

interface PersonalizedNewSong {
  alg: string;
  canDislike: boolean;
  copywriter: string;
  id: string;
  name: string;
  picUrl: string;
  song: any;
  trackNumberUpdateTime: number;
  type: number;
}

function PersonalizedNewSong() {
  const [requestPersonalizedNewSong, newSongList] = useRequest(
    getPersonalizedNewSong
  );

  useEffect(() => {
    requestPersonalizedNewSong();
  }, []);

  const renderItem = ({
    id,
    name,
    song: { album, artists, alias }
  }: PersonalizedNewSong) => {
    return (
      <div className="item-wrapper">
        <div className="song-info">
          <div className="song-name">
            <span className="name">{name}</span>
            {Array.isArray(alias) && !!alias.length && (
              <span className="info">({alias[0]})</span>
            )}
          </div>
          <div className="author">
            {artists[0].name} - {album.name}
          </div>
        </div>
        <div className="play">
          <PlayCircleOutlineOutlined className="icon-play" />
        </div>
      </div>
    );
  };

  const renderSkel = () => {
    return Array(10)
      .fill("")
      .map(() => {
        return (
          <div className="item-wrapper">
            <div className="song-info">
              <div className="song-name">
                <Skeleton variant="text" width="66vw" height="7vw" />
              </div>
              <div className="author">
                <Skeleton variant="text" width="40vw" />
              </div>
            </div>
            <div className="play">
              <Skeleton variant="rect" width="7vw" height="7vw" />
            </div>
          </div>
        );
      });
  };

  return (
    <div className="personalized_new_song-wrapper">
      {!newSongList
        ? renderSkel()
        : newSongList.result.map((item: PersonalizedNewSong) => {
            return <div key={item.id}>{renderItem(item)}</div>;
          })}
    </div>
  );
}

export default PersonalizedNewSong;
