import React from "react";
import { Input } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { TEmployee } from "@/types";

type Props = {
  disabled?: boolean;
  control: Control<TEmployee>;
  name: keyof TEmployee;
  type?: string;
};

function DataInput({ disabled, control, name, type = "text" }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange, onBlur } }) => (
        <Input
          value={value}
          disabled={disabled}
          type={type}
          disableUnderline={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
}

export default DataInput;
