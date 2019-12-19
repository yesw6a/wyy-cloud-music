import React, { useEffect } from "react";
import PageView from "../../../components/PageView";
import SkelAlbum from "../../../components/Skeletons/Album";

import LogoTitle from "../../../assets/images/logo_full_white.png";

import "./style.scss";
import Personalized from "./components/Personalized";

function Home() {
  const renderHeader = () => {
    return (
      <div className="header">
        <img src={LogoTitle} className="title-logo" alt="网易云音乐" />
      </div>
    );
  };

  return (
    <PageView>
      {renderHeader()}
      <Personalized />
    </PageView>
  );
}

export default Home;
