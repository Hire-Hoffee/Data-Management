"use client";

import DataTable from "./components/DataTable/DataTable";
import { Box } from "@mui/material";
import { getEmployees } from "../api/requests";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setData } from "@/store/dataSlice";

export default function Home() {
  const employees = useAppSelector((state) => state.data.companyData);
  const dispatch = useAppDispatch();

  const fetchEmployees = async () => {
    const response = (await getEmployees()).data;
    dispatch(setData(response.data));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Box margin="30px">
      <DataTable employeeData={employees} />
    </Box>
  );
}
