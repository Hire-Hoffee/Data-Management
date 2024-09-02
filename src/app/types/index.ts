export type TEmployee = {
  id?: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string;
};

export type TCredentials = {
  username: string;
  password: string;
};
