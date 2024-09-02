import api from "./index";
import { TEmployee } from "../types/index";

export const getEmployees = async () =>
  api.get<TEmployee[]>("/ru/data/v3/testmethods/docs/userdocs/get");

export const createEmployee = async (data: TEmployee) =>
  api.post("/ru/data/v3/testmethods/docs/userdocs/create", data);

export const updateEmployee = async (data: TEmployee) =>
  api.post(`/ru/data/v3/testmethods/docs/userdocs/set/${data.id}`, data);

export const deleteEmployee = async (id: string) =>
  api.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);
