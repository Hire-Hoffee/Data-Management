"use client";

import React from "react";
import { Table, TableBody, TableContainer, TableHead, Paper } from "@mui/material";
import { TEmployee } from "@/types";
import CustomTableRow from "../CustomTableRow/CustomTableRow";

type Props = {
  employeeData: TEmployee[] | undefined;
};

function DataTable({ employeeData }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          {employeeData && employeeData?.length > 0 ? (
            <CustomTableRow employeeData={employeeData[0]} isHeader />
          ) : (
            <>
              <CustomTableRow.Skeleton header />
            </>
          )}
        </TableHead>
        <TableBody>
          {employeeData && employeeData?.length > 0 ? (
            employeeData.map((item) => <CustomTableRow key={item.id} employeeData={item} />)
          ) : (
            <>
              <CustomTableRow.Skeleton />
              <CustomTableRow.Skeleton />
              <CustomTableRow.Skeleton />
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
