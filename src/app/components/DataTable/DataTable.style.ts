import { styled, TableCell, TableRow } from "@mui/material";

export const CustomCell = styled(TableCell)({
  whiteSpace: "nowrap",
  textAlign: "center",
});

export const CustomRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f1f1f1",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});
