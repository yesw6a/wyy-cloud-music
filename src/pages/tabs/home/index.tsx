import React, { useEffect } from "react";
import PageView from "../../../components/PageView";
import SkelAlbum from "../../../components/Skeletons/Album";

import LogoTitle from "../../../assets/images/logo_full_white.png";

import "./style.scss";
import Personalized from "./components/Personalized";
import PersonalizedNewSong from "./components/PersonalizedNewSong";

function Home() {
  const renderHeader = () => {
    return (
      <div className="header">
        <img src={LogoTitle} className="title-logo" alt="网易云音乐" />
      </div>
    );
  };

  return (
    <PageView className="home">
      {renderHeader()}
      <div className="container">
        <div className="module-title">推荐歌单</div>
        <Personalized />
        <div className="module-title">最新音乐</div>
        <PersonalizedNewSong />
      </div>
    </PageView>
  );
}

export default Home;
