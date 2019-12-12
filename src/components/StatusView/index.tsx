import React from "react";
import PropTypes from "prop-types";

import ErrorImg from "../../assets/images/error.png";
import EmptyImg from "../../assets/images/empty.png";

import "./style.scss";

interface IProps {
  status?: string;
  tips?: string;
  style?: object;
  children?: any;
}

export const StateError = "ERROR";
export const StateLoad = "LOADING";
export const StateEmpty = "EMPTY";

function StatusView({ status, tips, style, children }: IProps) {
  const renderError = () => {
    return (
      <>
        <img src={ErrorImg} className="img-error" alt="" />;
        <div className="divider" />;<span className="tips">{tips}</span>;
      </>
    );
  };

  const renderEmpty = () => {
    return (
      <>
        <img src={EmptyImg} className="img-empty" alt="" />;
        <div className="divider" />;<span className="tips">{tips}</span>;
      </>
    );
  };

  const renderLoading = () => {
    return <span>Loading...</span>;
  };

  const renderChild = () => {
    return children;
  };

  let view = null;
  if (status === StateLoad) {
    view = renderLoading();
  } else if (status === StateError) {
    view = renderError();
  } else if (status === StateEmpty) {
    view = renderEmpty();
  } else {
    view = renderChild();
  }

  return (
    <div style={style} className="container">
      {view}
    </div>
  );
}

StatusView.propTypes = {
  status: PropTypes.oneOf([StateEmpty, StateError, StateLoad]),
  tips: PropTypes.string
};

export default StatusView;
