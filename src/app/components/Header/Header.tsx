import React from "react";
import { Box, AppBar, Typography, Toolbar, Button } from "@mui/material";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

type Props = {};

function Header({}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <ManageAccountsRoundedIcon fontSize="large" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: "20px" }}>
            Data Management
          </Typography>
          <Button color="inherit" sx={{ fontWeight: "bold" }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
