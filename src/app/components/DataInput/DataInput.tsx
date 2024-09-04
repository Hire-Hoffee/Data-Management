import React from "react";
import { Input, Typography, Box } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TEmployee } from "@/types";

type Props = {
  disabled?: boolean;
  control: Control<TEmployee>;
  name: keyof TEmployee;
  type?: string;
  errors?: FieldErrors<TEmployee>;
};

function DataInput({ disabled, control, name, type = "text", errors }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange, onBlur } }) => (
        <Box position="relative">
          <Input
            value={value}
            disabled={name === "id" ? true : disabled}
            type={type}
            disableUnderline={name === "id" ? true : disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
          {errors?.[name] && (
            <Typography color="error" position="absolute" fontSize="12px">
              {errors?.[name]?.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}

export default DataInput;
