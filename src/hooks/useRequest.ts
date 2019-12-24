import { useState, useCallback } from "react";

function useRequest(fetchRequest: any) {
  const [res, setRes] = useState();
  const callMethod = (o: any) =>
    fetchRequest(o).then((r: any) => {
      setRes(r.data);
      return r.data;
    });
  const callRequest = useCallback(callMethod, []);
  return [callRequest, res];
}

export default useRequest;
