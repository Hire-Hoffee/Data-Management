import React, { useState } from "react";
import * as SC from "./CustomTableRow.style";
import { TEmployee } from "@/app/types";
import { EditNote, Delete, CheckCircle } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";
import DataInput from "../DataInput/DataInput";

type Props = {
  employeeData: TEmployee | undefined;
  isHeader?: boolean;
};

function CustomTableRow({ employeeData, isHeader }: Props) {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <>
      {isHeader ? (
        <SC.CustomRow>
          {employeeData &&
            Object.entries(employeeData).map(([key, value], i) => (
              <SC.CustomCell sx={{ backgroundColor: "#b8b7b7", fontWeight: "bold" }} key={i}>
                {key}
              </SC.CustomCell>
            ))}
          <SC.CustomCell sx={{ backgroundColor: "#b8b7b7", fontWeight: "bold" }}>
            Edit
          </SC.CustomCell>
        </SC.CustomRow>
      ) : (
        <SC.CustomRow>
          {employeeData &&
            Object.entries(employeeData).map(([key, value], i) => (
              <SC.CustomCell key={i}>
                {<DataInput value={value} disabled={isDisabled} />}
              </SC.CustomCell>
            ))}
          <SC.CustomCell>
            <Button color="inherit" onClick={() => setIsDisabled(!isDisabled)}>
              {isDisabled ? <EditNote /> : <CheckCircle stroke="green" />}
            </Button>
            <Button color="error">
              <Delete />
            </Button>
          </SC.CustomCell>
        </SC.CustomRow>
      )}
    </>
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
