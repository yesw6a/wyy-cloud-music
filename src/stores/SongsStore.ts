import request from "../lib/request";

const API_GET_PERSONALIZED = "/personalized";
const API_GET_PERSONALIZED_NEW_SONG = "/personalized/newsong";

// 获取推荐歌单
export const getPersonalized = (params?: object) =>
  request.get(API_GET_PERSONALIZED, params);
// 获取推荐新歌
export const getPersonalizedNewSong = () =>
  request.get(API_GET_PERSONALIZED_NEW_SONG);

export default {};
