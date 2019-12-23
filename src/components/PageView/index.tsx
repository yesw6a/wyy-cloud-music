import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import StatusView from "../StatusView";

import "./style.scss";
interface IProps {
  className?: any;
  statusObj?: object;
  style?: object;
  children: any;
}

function PageView({ className, statusObj, style, children }: IProps) {
  let view = null;
  if (statusObj) {
    view = <StatusView {...statusObj} />;
  } else {
    view = <>{children}</>;
  }
  return (
    <div className={classNames("page-wrapper", className)} style={style}>
      {view}
    </div>
  );
}

PageView.propTypes = {
  statusObj: PropTypes.object,
  style: PropTypes.object
};

export default PageView;
