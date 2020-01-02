import request from "../lib/request";

const API_GET_PERSONALIZED = "/personalized";
const API_GET_PERSONALIZED_NEW_SONG = "/personalized/newsong";
const API_GET_SONG_URL = "/song/url";
const API_GET_SONG_DETAIL = "/song/detail";
const API_GET_LYRIC = "/lyric";
const API_GET_SIMI_PLAY_LIST = "/simi/playlist";
const API_GET_SIMI_SONGS = "/simi/song";

// 获取推荐歌单
export const getPersonalized = (params?: object) =>
  request.get(API_GET_PERSONALIZED, params);
// 获取推荐新歌
export const getPersonalizedNewSong = () =>
  request.get(API_GET_PERSONALIZED_NEW_SONG);
// 获取音乐URL
export const getSongUrl = (params: object) =>
  request.get(API_GET_SONG_URL, params);
// 获取歌曲详情
export const getSongDetail = (params: object) =>
  request.get(API_GET_SONG_DETAIL, params);
// 获取歌词
export const getLyric = (params: object) => request.get(API_GET_LYRIC, params);
// 获取相似歌单
export const getSimiPlayList = (params: object) =>
  request.get(API_GET_SIMI_PLAY_LIST, params);
// 获取相似歌曲
export const getSimiSongs = (params: object) =>
  request.get(API_GET_SIMI_SONGS, params);

export default {};
