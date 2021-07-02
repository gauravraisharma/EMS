export class employeeDetail {
  employeeId: string;

  name: string;

  empCode: string;

  designationName: string;

  dateOfBirth: Date | undefined;

  joiningDate: string;

  contactNumber1: string;

  adharCardNumber: string | undefined;

  correspondenceAddress: string | undefined;

  panNumber: string | undefined;

  skypeId: string;

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
    designationName = '',
    dateOfBirth = undefined,
    correspondenceAddress = '',
    skypeId = '',
    adharCardNumber = undefined,
    panNumber = undefined,
  }: Partial<employeeDetail> = {}) {
    this.employeeId = employeeId;
    this.name = name;
    this.empCode = empCode;
    this.joiningDate = joiningDate;
    this.contactNumber1 = contactNumber1;
    this.officialEmailId = officialEmailId;
    this.departmentName = departmentName;
    this.bloodGroup = bloodGroup;
    this.designationName = designationName;
    this.dateOfBirth = dateOfBirth;
    this.correspondenceAddress = correspondenceAddress;
    this.skypeId = skypeId;
    this.adharCardNumber = adharCardNumber;
    this.panNumber = panNumber;
  }
}
