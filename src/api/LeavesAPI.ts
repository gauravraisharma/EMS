import {AxiosResponse} from 'axios';
import {API_HOST} from '../config/app-env';
import {API} from './API';
import {leaveRequest} from '../models';

const API_APPLY = `${API_HOST}/api/leaves/Apply`;

const API_USER_LEAVES = `${API_HOST}/api/leaves/GetUserLeaves`;

const API_LEAVE_REQUESTS = `${API_HOST}/api/leaves/GetLeaveApprovalRequests`;

const API_Approve = `${API_HOST}/api/leaves/Approve`;

export interface approvalPayload {
  isApprove: boolean;
  leaveId: number;
}

export class LeavesApi extends API {
  static async getApprovalRequests(): Promise<leaveRequest[]> {
    const res: AxiosResponse<leaveRequest[]> = await this.makeGet<
      leaveRequest[]
    >(API_LEAVE_REQUESTS);
    return res.data;
  }
  static async getUserLeaves(): Promise<leaveRequest> {
    const res: AxiosResponse<leaveRequest> = await this.makeGet<leaveRequest>(
      API_USER_LEAVES,
    );
    return res.data;
  }
  static async apply(leave: leaveRequest): Promise<any> {
    const res: AxiosResponse<any> = await this.makePost<any, leaveRequest>(
      API_APPLY,
      leave,
    );
    return res.data;
  }
  static async approve(approval: approvalPayload): Promise<any> {
    const res: AxiosResponse<any> = await this.makePatch<any, approvalPayload>(
      API_Approve,
      approval,
    );
    return res.data;
  }
}
