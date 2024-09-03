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

export type TApiResponse = {
  error_code: number;
  error_message: string;
  data: TEmployee[];
  profiling: string;
  timings: null;
};

export type TCredentials = {
  username: string;
  password: string;
};
