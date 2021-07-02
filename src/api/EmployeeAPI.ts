import {AxiosError, AxiosResponse} from 'axios';
import {EntityNotFoundErrorResponse, QueryParams, ServerError} from '../models';
import {API_HOST} from '../config/app-env';
import {API} from './API';
import {employee} from '../models';
import {route} from '../config/helpers';
import {FinalResponse} from '../models/api/FinalResponse';

const API_GET_ALL_EMP = `${API_HOST}/api/Employee/GetEmployees`;

const API_GET_EMP_DETAIL = `${API_HOST}​/api/Employee/GetEmployeeById/{employeeId}`;

const API_APPROVERS = `${API_HOST}/api/Employee/Approvers`;

export class EmployeeApi extends API {
  static async get(params: QueryParams): Promise<employee[]> {
    const res: AxiosResponse<employee[]> = await this.makeGet<employee[]>(
      API_GET_ALL_EMP,
      params,
    );
    return res.data;
  }

  static async getEmployeeById<employeeDetail>(
    employeeId: string,
  ): Promise<FinalResponse<employeeDetail | null>> {
    const path = route(API_GET_EMP_DETAIL, {employeeId});
    console.log(path);
    return this.makeGet<employeeDetail>(path)
      .then(({data}) =>
        Promise.resolve(new FinalResponse<employeeDetail>(data)),
      )
      .catch(error => this.handleServerError(error))
      .catch(error => {
        const {response} = error as AxiosError;
        if (response) {
          const {status} = response;
          if (status === 404) {
            return Promise.resolve(
              new FinalResponse(null, new EntityNotFoundErrorResponse()),
            );
          }
        }
        return Promise.reject(error);
      })
      .catch(error => this.handleUnknownError(error));
  }

  private static handleServerError(
    error: AxiosError | ServerError,
  ): Promise<FinalResponse<null>> {
    const {message} = error;
    if (error instanceof ServerError) {
      return Promise.resolve(new FinalResponse(null, message));
    }
    return Promise.reject(error);
  }
  private static handleUnknownError(
    error: AxiosError | ServerError,
  ): Promise<FinalResponse<null>> {
    const {message} = error;
    return Promise.resolve(new FinalResponse(null, message));
  }
  static async getApprover(params: QueryParams): Promise<employee[]> {
    const res: AxiosResponse<employee[]> = await this.makeGet<employee[]>(
      API_APPROVERS,
      params,
    );
    return res.data;
  }
}
