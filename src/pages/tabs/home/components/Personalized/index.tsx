import React, { useEffect } from "react";
import { getPersonalized } from "../../../../../stores/SongsStore";
import useRequest from "../../../../../hooks/useRequest";
import UnitConversion from "../../../../../lib/unitConversion";
import { Skeleton } from "@material-ui/lab";

import "./style.scss";

interface Personalized {
  alg: string;
  copywriter: string;
  canDislike: boolean;
  highQuality: boolean;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  type: number;
}

function Personalized() {
  const [requestGetPersonalized, personalizedList] = useRequest(
    getPersonalized
  );

  useEffect(() => {
    requestGetPersonalized({
      query: {
        limit: 6
      }
    });
  }, []);

  const renderItem = ({ id, name, picUrl, playCount }: Personalized) => {
    return (
      <div className="album">
        <div className="card">
          <img src={picUrl} className="img" />
          <span className="play-count">{UnitConversion(playCount)}</span>
        </div>
        <div className="title">{name}</div>
      </div>
    );
  };

  const renderSkel = () => {
    const baseSize = 31.2;
    const imgSize = `${baseSize}vw`;
    return Array(6)
      .fill("")
      .map((item, index) => {
        return (
          <div key={index}>
            <Skeleton variant="rect" width={imgSize} height={imgSize} />
            <Skeleton variant="text" width={imgSize} />
            <Skeleton variant="text" width={`${baseSize * 0.8}vw`} />
          </div>
        );
      });
  };

  return (
    <div className="personalized-wrapper">
      {!personalizedList
        ? renderSkel()
        : personalizedList.result.map((item: Personalized) => {
            return <div key={item.id}>{renderItem(item)}</div>;
          })}
    </div>
  );
}

export default Personalized;
