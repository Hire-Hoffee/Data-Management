import React from "react";
import { Input } from "@mui/material";
import { validateAndFormatDateTime } from "@/app/utils/utilsFunctions";

type Props = {
  value: string;
  disabled?: boolean;
};

function DataInput({ value, disabled }: Props) {
  const { isValid, dateForInput } = validateAndFormatDateTime(value);

  return (
    <Input
      value={isValid ? dateForInput : value}
      disabled={disabled}
      type={isValid ? "datetime-local" : "text"}
      disableUnderline={disabled}
    />
  );
}

export default DataInput;
