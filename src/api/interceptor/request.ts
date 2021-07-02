import {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN_KEY} from '../../config/app-env';

export const onRequestFulfilled = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const token: any = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const onRequestRejected = (error: any): null => {
  // eslint-disable-next-line no-console
  console.error(error);
  return null;
};
