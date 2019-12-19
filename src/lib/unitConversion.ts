/*
 * @Description: 单位转换工具函数
 */

type value = number;

const thousand = 1000;
const thousand_10 = thousand * 10;
const thousand_100 = thousand * 100;
const million = thousand * thousand; // 1000000
const million_10 = million * 10;
const million_100 = million * 100;
const billion = million * 1000;

const to10K = (value: value) => {
  return `${(value / thousand_10).toFixed(1)}万`;
};

const to100M = (value: value) => {
  return `${(value / million_100).toFixed(1)}亿`;
};

/**
 * @description: 转换数字单位
 * @param {Number | String} value - 需要转换单位的值
 * @return: 返回转换后的值
 */
const convertUnit = (value: value) => {
  const num = Number(value);

  if (num > million_100) {
    return to100M(num);
  }
  if (num > thousand_10) {
    return to10K(num);
  }
  return num;
};

export default convertUnit;
