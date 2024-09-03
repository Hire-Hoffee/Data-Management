"use client";

import DataTable from "./components/DataTable/DataTable";
import { Box, Button } from "@mui/material";
import { getEmployees } from "../api/requests";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setData, createNewItem } from "@/store/dataSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
      <Box display={"flex"} justifyContent={"flex-end"} marginBottom="5px">
        <Button color="inherit" onClick={() => dispatch(createNewItem(true))}>
          <AddCircleOutlineIcon fontSize="large" />
        </Button>
      </Box>
      <DataTable employeeData={employees} />
    </Box>
  );
}
