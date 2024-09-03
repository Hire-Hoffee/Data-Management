import React, { useState } from "react";
import * as SC from "./CustomTableRow.style";
import { TEmployee } from "@/types";
import { EditNote, Delete, CheckCircle } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";
import DataInput from "../DataInput/DataInput";
import { useForm } from "react-hook-form";
import { validateAndFormatDateTime } from "@/utils/utilsFunctions";
import { updateEmployee, deleteEmployee, createEmployee } from "@/api/requests";
import { useAppDispatch } from "@/store";
import { filterData, createNewItem, addItem } from "@/store/dataSlice";

type Props = {
  employeeData: TEmployee | undefined;
  isHeader?: boolean;
  disabled?: boolean;
  newItem?: boolean;
};

function CustomTableRow({ employeeData, isHeader, disabled, newItem }: Props) {
  const { control, handleSubmit, getValues } = useForm<TEmployee>({
    defaultValues: {
      ...employeeData,
      employeeSigDate: validateAndFormatDateTime(employeeData?.employeeSigDate).dateForInput,
      companySigDate: validateAndFormatDateTime(employeeData?.companySigDate).dateForInput,
    },
  });
  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState(disabled ?? true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setIsLoading(true);
    const data = getValues();
    delete data.id;
    const newItem = (await createEmployee(data)).data;
    dispatch(createNewItem(false));
    dispatch(addItem(newItem.data));
    setIsDisabled(true);
    setIsLoading(false);
  };

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

  const handleDelete = async () => {
    if (newItem) {
      dispatch(createNewItem(false));
      return;
    }
    const data = getValues();
    if (data.id) {
      await deleteEmployee(data.id);
      dispatch(filterData(data.id));
    }
  };

  if (isLoading) {
    return (
      <CustomTableRow.Skeleton colSpan={employeeData ? Object.keys(employeeData).length : 1} />
    );
  }

  return (
    <>
      {isHeader ? (
        <SC.CustomRow>
          {employeeData &&
            Object.entries(employeeData).map(([key, value], i) => (
              <SC.CustomCell sx={{ backgroundColor: "#b8b7b7", fontWeight: "bold" }} key={i}>
                {key.toUpperCase()}
              </SC.CustomCell>
            ))}
          <SC.CustomCell sx={{ backgroundColor: "#b8b7b7", fontWeight: "bold" }}>
            EDIT
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
            <Button color="inherit" onClick={newItem ? handleCreate : handleEdit}>
              {isDisabled ? <EditNote /> : <CheckCircle stroke="green" />}
            </Button>
            <Button color="error" onClick={handleDelete}>
              <Delete />
            </Button>
          </SC.CustomCell>
        </SC.CustomRow>
      )}
    </>
  );
}

CustomTableRow.Skeleton = function RowSkeleton({
  header,
  colSpan,
}: {
  header?: boolean;
  colSpan?: number;
}) {
  return (
    <>
      <SC.CustomRow>
        <SC.CustomCell sx={{ backgroundColor: header ? "#b8b7b7" : "" }} colSpan={colSpan ?? 1}>
          <Skeleton height={50} />
        </SC.CustomCell>
      </SC.CustomRow>
    </>
  );
};

export default CustomTableRow;
