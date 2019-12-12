import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import {
  HomeRounded as HomeRoundedIcon,
  SearchRounded as SearchRoundedIcon,
  WhatshotRounded as WhatshotRoundedIcon,
  PersonRounded as PersonRoundedIcon
} from "@material-ui/icons";

import "./style.scss";

function BottomNav() {
  const history = useHistory();
  const menus = [
    { url: "/", label: "首页", icon: <HomeRoundedIcon /> },
    { url: "/hot", label: "热歌榜", icon: <WhatshotRoundedIcon /> },
    { url: "/search", label: "搜索", icon: <SearchRoundedIcon /> },
    { url: "/user", label: "我的", icon: <PersonRoundedIcon /> }
  ];

  const [value, setValue] = useState("/");

  return (
    <BottomNavigation
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue);
        history.push(newValue);
      }}
      showLabels
      className="nav"
    >
      {menus.map(({ url, label, icon }) => {
        return (
          <BottomNavigationAction
            key={url}
            label={label}
            icon={icon}
            value={url}
          />
        );
      })}
    </BottomNavigation>
  );
}

export default BottomNav;
