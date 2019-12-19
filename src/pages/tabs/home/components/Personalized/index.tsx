import React, { useEffect } from "react";
import { getPersonalized } from "../../../../../stores/SongsStore";
import useRequest from "../../../../../hooks/useRequest";
import UnitConversion from "../../../../../lib/unitConversion";

import "./style.scss";

interface personalized {
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

  const renderItem = ({ id, name, picUrl, playCount }: personalized) => {
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

  if (!personalizedList) {
    return <div>加载中</div>;
  }

  return (
    <div className="personalized-wrapper">
      {personalizedList &&
        personalizedList.result.map((item: personalized) => {
          return <div key={item.id}>{renderItem(item)}</div>;
        })}
    </div>
  );
}

export default Personalized;
