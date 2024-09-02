"use client";

import React from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { employeeData } from "@/app/utils/mockData";
import * as SC from "./DataTable.style";

type Props = {};

function DataTable({}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#b8b7b7" }}>
          <TableRow>
            <SC.CustomCell isBold>id</SC.CustomCell>
            <SC.CustomCell isBold>documentStatus</SC.CustomCell>
            <SC.CustomCell isBold>employeeNumber</SC.CustomCell>
            <SC.CustomCell isBold>documentType</SC.CustomCell>
            <SC.CustomCell isBold>documentName</SC.CustomCell>
            <SC.CustomCell isBold>companySignatureName</SC.CustomCell>
            <SC.CustomCell isBold>employeeSignatureName</SC.CustomCell>
            <SC.CustomCell isBold>employeeSigDate</SC.CustomCell>
            <SC.CustomCell isBold>companySigDate</SC.CustomCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((item) => (
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
            </SC.CustomRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
