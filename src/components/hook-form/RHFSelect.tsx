// form
import {
  // useFormContext,
  Controller,
} from "react-hook-form";
// @mui
import { TextField, type TextFieldProps } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  children: React.ReactNode;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({ name, children, ...other }: Props) {
  // const { control } = useFormContext();

  return (
    <Controller
      name={name}
      // control={control ?? "control"}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
          InputLabelProps={{
            shrink: true,
            required: true,
            sx: {
              "& .MuiInputLabel-asterisk": {
                color: "red",
              },
            },
          }}
        >
          {children}
        </TextField>
      )}
    />
  );
}
