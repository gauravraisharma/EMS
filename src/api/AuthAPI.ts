import {AxiosResponse} from 'axios';
import {API_HOST} from '../config/app-env';
import {employeeDetail} from '../models';
import {API} from './API';

const API_LOGIN_CHECK = `${API_HOST}/api/Account/Auth`;

const API_ME = `${API_HOST}/api/Account/Me`;

const API_FORGOT_PASSWORD = `${API_HOST}/api/Account/ForgotPassword`;

export interface LoginResponse {
  token: string;
}

export interface LoginPayload {
  UserName: string;
  Password: string;
}

export interface ForgetPassordPayload {
  email: string;
}

export class AuthApi extends API {
  static async login(credentials: LoginPayload): Promise<LoginResponse> {
    const res: AxiosResponse<LoginResponse> = await this.makePost<
      LoginResponse,
      LoginPayload
    >(API_LOGIN_CHECK, credentials);
    return res.data;
  }

  static async forgotPassword(
    emailPayload: ForgetPassordPayload,
  ): Promise<any> {
    const res: AxiosResponse<any> = await this.makePost<
      any,
      ForgetPassordPayload
    >(API_FORGOT_PASSWORD, emailPayload);
    return res.data;
  }
  static async me(): Promise<employeeDetail> {
    const res: AxiosResponse<employeeDetail> =
      await this.makeGet<employeeDetail>(API_ME);
    return res.data;
  }
}
