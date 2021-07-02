import {AxiosError, AxiosResponse} from 'axios';
import {ServerError} from '../../models';
import {Navigation} from '../../types';

let navigation: Navigation;

export const onResponseFulfilled = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const onResponseRejected = (error: AxiosError): Promise<any> => {
  const status = error.response?.status;

  // status code available
  if (status) {
    if (status === 401 || status === 403) {
      navigation.navigate('login');
    }
    if (status >= 500 && status <= 599) {
      return Promise.reject(new ServerError());
    }
  }

  return Promise.reject(error);
};
