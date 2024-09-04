"use client";

import DataTable from "./components/DataTable/DataTable";
import { Box, Button, Typography } from "@mui/material";
import { getEmployees } from "../api/requests";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setData, createNewItem, setToken, setNotification } from "@/store/dataSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useRouter } from "next/navigation";

export default function Home() {
  const employees = useAppSelector((state) => state.data.companyData);
  const isLoggedIn = useAppSelector((state) => state.data.token);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchEmployees = async () => {
    try {
      const response = (await getEmployees()).data;

      if (response.error_code !== 0) {
        dispatch(setNotification("Произошла ошибка"));
        return;
      }

      dispatch(setData(response.data));
    } catch (error) {
      dispatch(setNotification("Произошла ошибка"));
    }
  };

  if (localStorage.getItem("token")) {
    dispatch(setToken(localStorage.getItem("token")!));
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth");
      return;
    }
    fetchEmployees();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Box margin="30px">
        <Typography variant="h5" textAlign="center" marginTop="20px">
          Чтобы просмотреть данные войдите в аккаунт
        </Typography>
      </Box>
    );
  }

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
