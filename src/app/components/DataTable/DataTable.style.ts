import { styled, TableCell, TableRow } from "@mui/material";

export const CustomCell = styled(TableCell)<{ isBold?: boolean }>(({ isBold }) => ({
  whiteSpace: "nowrap",
  fontWeight: isBold ? "bold" : "normal",
}));

export const CustomRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f1f1f1",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});
