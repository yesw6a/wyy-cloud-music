import React from "react";
import { Skeleton } from "@material-ui/lab";

function Album() {
  return (
    <div>
      <Skeleton variant="rect" width="32.768vw" height="32.768vw" />
      <Skeleton variant="text" width="32.768vw" />
    </div>
  );
}

export default Album;
