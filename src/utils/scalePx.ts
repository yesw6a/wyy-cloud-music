import BigNumber from "bignumber.js";

export default (value: number) => {
  if (isNaN(value)) {
    return 0;
  }
  const temp = new BigNumber(value).times(0.1333).toNumber();
  return temp + "vw";
};
