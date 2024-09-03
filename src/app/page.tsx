"use client";

import DataTable from "./components/DataTable/DataTable";
import { Box } from "@mui/material";
import { getEmployees } from "./api/requests";
import { useEffect, useState } from "react";
import { TEmployee } from "./types";

export default function Home() {
  const [employees, setEmployees] = useState<TEmployee[]>([]);

  const fetchEmployees = async () => {
    const response = (await getEmployees()).data;
    setEmployees(response.data);
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
