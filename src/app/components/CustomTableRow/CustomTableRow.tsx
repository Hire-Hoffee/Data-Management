import React, { useState } from "react";
import * as SC from "./CustomTableRow.style";
import { TEmployee } from "@/types";
import { EditNote, Delete, CheckCircle } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";
import DataInput from "../DataInput/DataInput";
import { useForm } from "react-hook-form";
import { validateAndFormatDateTime } from "@/utils/utilsFunctions";
import { updateEmployee } from "@/api/requests";

type Props = {
  employeeData: TEmployee | undefined;
  isHeader?: boolean;
};

function CustomTableRow({ employeeData, isHeader }: Props) {
  const { control, handleSubmit, getValues } = useForm<TEmployee>({
    defaultValues: {
      ...employeeData,
      employeeSigDate: validateAndFormatDateTime(employeeData?.employeeSigDate).dateForInput,
      companySigDate: validateAndFormatDateTime(employeeData?.companySigDate).dateForInput,
    },
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    setIsDisabled(false);

    if (!isDisabled) {
      setIsLoading(true);
      const data = getValues();
      await updateEmployee(data);
      setIsLoading(false);
      setIsDisabled(true);
    }
  };

  if (isLoading) {
    return <CustomTableRow.Skeleton />;
  }

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
                {
                  <DataInput
                    control={control}
                    name={key as keyof TEmployee}
                    disabled={isDisabled}
                    type={
                      key === "employeeSigDate" || key === "companySigDate"
                        ? "datetime-local"
                        : "text"
                    }
                  />
                }
              </SC.CustomCell>
            ))}
          <SC.CustomCell>
            <Button color="inherit" onClick={handleEdit}>
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
