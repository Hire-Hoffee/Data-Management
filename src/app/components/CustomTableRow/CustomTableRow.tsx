import React from "react";
import * as SC from "./CustomTableRow.style";
import { TEmployee } from "@/app/types";
import { EditNote, Delete } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";

type Props = {
  employeeData: TEmployee | undefined;
  isHeader?: boolean;
};

function CustomTableRow({ employeeData, isHeader }: Props) {
  return (
    <SC.CustomRow>
      {employeeData &&
        Object.entries(employeeData).map(([key, value], i) => (
          <SC.CustomCell sx={{ backgroundColor: isHeader ? "#b8b7b7" : "" }} key={i}>
            {isHeader ? key : value}
          </SC.CustomCell>
        ))}
      <SC.CustomCell sx={{ backgroundColor: isHeader ? "#b8b7b7" : "" }}>
        {!isHeader ? (
          <>
            <Button color="inherit">
              <EditNote />
            </Button>
            <Button color="error">
              <Delete />
            </Button>
          </>
        ) : (
          <>Edit</>
        )}
      </SC.CustomCell>
    </SC.CustomRow>
  );
}

CustomTableRow.Skeleton = function RowSkeleton({ header }: { header?: boolean }) {
  return (
    <>
      <SC.CustomRow>
        <SC.CustomCell sx={{ backgroundColor: header ? "#b8b7b7" : "" }}>
          <Skeleton height={50} />
        </SC.CustomCell>
      </SC.CustomRow>
    </>
  );
};

export default CustomTableRow;
