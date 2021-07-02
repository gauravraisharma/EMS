export class leaveRequest {
  leaveId?: number | undefined;
  employeeName?: string | undefined;
  reasonForLeave: string;

  leaveType: number | undefined;

  startLeave: Date | undefined;

  endLeave: Date | undefined;
  isApproved?: boolean | null;

  approverName?: string | undefined;

  numberOfLeaves?: number | undefined;

  remainingLeaves?: number | undefined;

  ApproverId: string;

  constructor({
    employeeName = '',
    reasonForLeave = '',
    leaveType = undefined,
    startLeave = undefined,
    endLeave = undefined,
    ApproverId = '',
    approverName = '',
    isApproved = null,
    numberOfLeaves = undefined,
    remainingLeaves = undefined,
    leaveId = undefined,
  }: Partial<leaveRequest> = {}) {
    this.reasonForLeave = reasonForLeave;
    this.leaveType = leaveType;
    this.startLeave = startLeave;
    this.endLeave = endLeave;
    this.ApproverId = ApproverId;
    this.approverName = approverName;
    this.employeeName = employeeName;
    this.isApproved = isApproved;
    this.numberOfLeaves = numberOfLeaves;
    this.remainingLeaves = remainingLeaves;
    this.leaveId = leaveId;
  }
}
