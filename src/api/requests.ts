import api from "./index";
import { TEmployee, TApiResponse, TCredentials, TAuthResponse } from "../types/index";

export const getEmployees = async () =>
  api.get<TApiResponse>("/ru/data/v3/testmethods/docs/userdocs/get");

export const createEmployee = async (data: TEmployee) =>
  api.post("/ru/data/v3/testmethods/docs/userdocs/create", data);

export const updateEmployee = async (data: TEmployee) =>
  api.post(`/ru/data/v3/testmethods/docs/userdocs/set/${data.id}`, data);

export const deleteEmployee = async (id: string) =>
  api.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);

export const auth = async (data: TCredentials) =>
  api.post<TAuthResponse>("https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login", data);
