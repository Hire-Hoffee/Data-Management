import React, { useState } from "react";
import * as SC from "./CustomTableRow.style";
import { TEmployee } from "@/types";
import { EditNote, Delete, CheckCircle } from "@mui/icons-material";
import { Button, Skeleton } from "@mui/material";
import DataInput from "../DataInput/DataInput";
import { useForm } from "react-hook-form";
import { validateAndFormatDateTime, convertLocalToUTC } from "@/utils/utilsFunctions";
import { updateEmployee, deleteEmployee, createEmployee } from "@/api/requests";
import { useAppDispatch } from "@/store";
import { filterData, createNewItem, addItem, setNotification } from "@/store/dataSlice";
import { validationSchema } from "./CustomTableRowTypes";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  employeeData: TEmployee | undefined;
  isHeader?: boolean;
  disabled?: boolean;
  newItem?: boolean;
};

function CustomTableRow({ employeeData, isHeader, disabled, newItem }: Props) {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TEmployee>({
    defaultValues: {
      ...employeeData,
      employeeSigDate: validateAndFormatDateTime(employeeData?.employeeSigDate).dateForInput,
      companySigDate: validateAndFormatDateTime(employeeData?.companySigDate).dateForInput,
    },
    resolver: zodResolver(validationSchema),
    mode: "all",
  });
  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState(disabled ?? true);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = () => {
    dispatch(setNotification("Произошла ошибка"));
    reset();
    setIsLoading(false);
  };

  const handleCreate = async (data: TEmployee) => {
    try {
      setIsLoading(true);
      delete data.id;

      data.employeeSigDate = convertLocalToUTC(data.employeeSigDate);
      data.companySigDate = convertLocalToUTC(data.companySigDate);

      const response = (await createEmployee(data)).data;

      if (response.error_code !== 0) {
        handleError();
        return;
      }

      dispatch(createNewItem(false));
      dispatch(addItem(response.data));
      setIsDisabled(true);
      setIsLoading(false);
    } catch (error) {
      handleError();
    }
  };

  const handleEdit = async (data: TEmployee) => {
    try {
      setIsDisabled(!isDisabled);
      if (!isDisabled) {
        setIsLoading(true);

        data.employeeSigDate = convertLocalToUTC(data.employeeSigDate);
        data.companySigDate = convertLocalToUTC(data.companySigDate);

        const response = (await updateEmployee(data)).data;

        if (response.error_code !== 0) {
          handleError();
          return;
        }

        setIsLoading(false);
        setIsDisabled(true);
      }
    } catch (error) {
      handleError();
    }
  };

  const handleDelete = async () => {
    if (newItem) {
      dispatch(createNewItem(false));
      return;
    }
    const data = getValues();
    if (data.id) {
      setIsLoading(true);
      await deleteEmployee(data.id);
      dispatch(filterData(data.id));
      setIsLoading(false);
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
          <SC.CustomCell
            sx={{ backgroundColor: "#b8b7b7", fontWeight: "bold", textAlign: "center" }}
          >
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
                    errors={errors}
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
            <Button color="inherit" onClick={handleSubmit(newItem ? handleCreate : handleEdit)}>
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
