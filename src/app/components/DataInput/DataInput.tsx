import React from "react";
import { Input, Typography, Box } from "@mui/material";
import { Controller, Control, FieldErrors, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  disabled?: boolean;
  control: Control<T>;
  name: Path<T>;
  type?: string;
  errors?: FieldErrors<T>;
  placeholder?: string;
  sx?: React.CSSProperties;
  disableUnderline?: boolean;
};

function DataInput<T extends FieldValues>({
  disabled,
  control,
  name,
  type = "text",
  errors,
  placeholder,
  sx,
  disableUnderline,
}: Props<T>) {
  const errorMessage = errors?.[name]?.message;
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
            disableUnderline={disableUnderline ?? name === "id" ? true : disabled}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            sx={sx}
          />
          {errorMessage && typeof errorMessage === "string" && (
            <Typography color="error" position="absolute" fontSize="12px">
              {errorMessage}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}

export default DataInput;
