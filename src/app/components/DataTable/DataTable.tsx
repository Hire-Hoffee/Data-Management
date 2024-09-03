"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import * as SC from "./DataTable.style";
import { TEmployee } from "@/app/types";
import { EditNote, Delete } from "@mui/icons-material";

type Props = {
  employeeData: TEmployee[] | undefined;
};

function DataTable({ employeeData }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#b8b7b7" }}>
          <TableRow>
            <SC.CustomCell>id</SC.CustomCell>
            <SC.CustomCell>documentStatus</SC.CustomCell>
            <SC.CustomCell>employeeNumber</SC.CustomCell>
            <SC.CustomCell>documentType</SC.CustomCell>
            <SC.CustomCell>documentName</SC.CustomCell>
            <SC.CustomCell>companySignatureName</SC.CustomCell>
            <SC.CustomCell>employeeSignatureName</SC.CustomCell>
            <SC.CustomCell>employeeSigDate</SC.CustomCell>
            <SC.CustomCell>companySigDate</SC.CustomCell>
            <SC.CustomCell>edit</SC.CustomCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData &&
            employeeData.map((item) => (
              <SC.CustomRow key={item.id}>
                <SC.CustomCell sx={{ textWrap: "nowrap" }}>{item.id}</SC.CustomCell>
                <SC.CustomCell>{item.documentStatus}</SC.CustomCell>
                <SC.CustomCell>{item.employeeNumber}</SC.CustomCell>
                <SC.CustomCell>{item.documentType}</SC.CustomCell>
                <SC.CustomCell>{item.documentName}</SC.CustomCell>
                <SC.CustomCell>{item.companySignatureName}</SC.CustomCell>
                <SC.CustomCell>{item.employeeSignatureName}</SC.CustomCell>
                <SC.CustomCell>{item.employeeSigDate}</SC.CustomCell>
                <SC.CustomCell>{item.companySigDate}</SC.CustomCell>
                <SC.CustomCell>
                  <Button color="inherit">
                    <EditNote />
                  </Button>
                  <Button color="inherit">
                    <Delete />
                  </Button>
                </SC.CustomCell>
              </SC.CustomRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
