import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { employeeData } from "@/app/utils/mockData";

type Props = {};

function DataTable({}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead color="primary">
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>documentStatus</TableCell>
            <TableCell>employeeNumber</TableCell>
            <TableCell>documentType</TableCell>
            <TableCell>documentName</TableCell>
            <TableCell>companySignatureName</TableCell>
            <TableCell>employeeSignatureName</TableCell>
            <TableCell>employeeSigDate</TableCell>
            <TableCell>companySigDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.documentStatus}</TableCell>
              <TableCell>{item.employeeNumber}</TableCell>
              <TableCell>{item.documentType}</TableCell>
              <TableCell>{item.documentName}</TableCell>
              <TableCell>{item.companySignatureName}</TableCell>
              <TableCell>{item.employeeSignatureName}</TableCell>
              <TableCell>{item.employeeSigDate}</TableCell>
              <TableCell>{item.companySigDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
