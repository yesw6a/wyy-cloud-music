import React from "react";
import PropTypes from "prop-types";

import StatusView from "../StatusView";

interface IProps {
  statusObj?: object;
  style?: object;
  children: any;
}

function PageView({ statusObj, style, children }: IProps) {
  let view = null;
  if (statusObj) {
    view = <StatusView {...statusObj} />;
  } else {
    view = <>{children}</>;
  }
  return <div style={style}>{view}</div>;
}

PageView.propTypes = {
  statusObj: PropTypes.object,
  style: PropTypes.object
};

export default PageView;
