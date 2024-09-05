"use client";

import React from "react";
import { Box, AppBar, Typography, Toolbar, Button, Snackbar, Alert } from "@mui/material";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import { useAppDispatch, useAppSelector } from "@/store";
import { setNotification } from "@/store/dataSlice";

type Props = {};

function Header({}: Props) {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.data.notification);
  const isLoggedIn = useAppSelector((state) => state.data.token);

  const handleExit = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <ManageAccountsRoundedIcon fontSize="large" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: "20px" }}>
            Data Management
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={handleExit}>
              Выйти
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => dispatch(setNotification(null))}
      >
        <Alert variant="outlined" severity="error">
          {notification}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Header;
