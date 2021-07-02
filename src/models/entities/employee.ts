export class employee {
  employeeId: string;

  name: string;

  empCode: string;

  joiningDate: string;

  contactNumber1: string;

  officialEmailId: string;

  departmentName: string;

  bloodGroup: string;

  constructor({
    employeeId = '',
    name = '',
    empCode = '',
    joiningDate = '',
    contactNumber1 = '',
    officialEmailId = '',
    departmentName = '',
    bloodGroup = '',
  }: Partial<employee> = {}) {
    this.employeeId = employeeId;
    this.name = name;
    this.empCode = empCode;
    this.joiningDate = joiningDate;
    this.contactNumber1 = contactNumber1;
    this.officialEmailId = officialEmailId;
    this.departmentName = departmentName;
    this.bloodGroup = bloodGroup;
  }
}
