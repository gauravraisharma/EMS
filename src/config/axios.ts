import {default as Axios, AxiosRequestConfig, AxiosInstance} from 'axios';
import QueryString from 'qs';
import {
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected,
} from '../api/interceptor';

const defaultConfig: AxiosRequestConfig = {
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: params => {
    return QueryString.stringify(params, {arrayFormat: 'brackets'});
  },
};

Axios.defaults = {...Axios.defaults, ...defaultConfig};

export const createAxios = (
  configuration: AxiosRequestConfig,
): AxiosInstance => {
  return Axios.create(configuration);
};

let axios: AxiosInstance = createAxios(defaultConfig);
axios.interceptors.request.use(onRequestFulfilled, onRequestRejected);
axios.interceptors.response.use(onResponseFulfilled, onResponseRejected);

export default axios;
