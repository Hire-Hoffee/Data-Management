"use client";

import React from "react";
import { Table, TableBody, TableContainer, TableHead, Paper } from "@mui/material";
import { TEmployee } from "@/types";
import CustomTableRow from "../CustomTableRow/CustomTableRow";
import { useAppSelector } from "@/store";

type Props = {
  employeeData: TEmployee[] | undefined;
};

const NEW_EMPLOYEE: TEmployee = {
  id: "",
  documentStatus: "",
  employeeNumber: "",
  documentType: "",
  documentName: "",
  companySignatureName: "",
  employeeSignatureName: "",
  employeeSigDate: "",
  companySigDate: "",
};

function DataTable({ employeeData }: Props) {
  const createNewItem = useAppSelector((state) => state.data.newItem);

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
          {createNewItem && <CustomTableRow employeeData={NEW_EMPLOYEE} disabled={false} newItem />}
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
