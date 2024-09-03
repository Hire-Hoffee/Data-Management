import { TableCell, TableRow } from "@mui/material";
import styled from "@emotion/styled";

export const CustomCell = styled(TableCell)`
  white-space: nowrap;
  text-align: center;

  .MuiInput-root {
    font-weight: bolder;
  }

  .Mui-disabled {
    -webkit-text-fill-color: rgba(0, 0, 0, 1) !important;
    font-weight: normal;
  }
`;

export const CustomRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: "#f1f1f1";
  }

  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;
