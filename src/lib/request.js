/**
 * request.get(url,options)
 * @param url
 * @param options ==> {body,query,params}
 */
import axios from 'axios';
import * as pathToRegexp from 'path-to-regexp';
import { beforeFetch, errorFetch, afterFetch } from './app';
import { API_PREFIX } from './constants';

const instance = axios.create({
  baseURL: API_PREFIX,
  timeout: 5000,
});
// 添加请求拦截器
instance.interceptors.request.use(beforeFetch, errorFetch);
instance.interceptors.response.use(afterFetch, errorFetch);

const methods = ['get', 'post', 'put', 'patch', 'delete'];
const request = {};

methods.forEach(method => {
  request[method] = (path, { params, body, query } = {}, config = {}) => {
    const mergeUrlParams = pathToRegexp.compile(path);
    const urlMergedParams = mergeUrlParams(params);
    return instance({ method, url: urlMergedParams, data: body, params: query, ...config });
  };
});

export default request;
