import request from "../lib/request";

const API_GET_PERSONALIZED = "/personalized";

// 获取推荐歌单
export const getPersonalized = (params?: object) =>
  request.get(API_GET_PERSONALIZED, params);

export default {};
