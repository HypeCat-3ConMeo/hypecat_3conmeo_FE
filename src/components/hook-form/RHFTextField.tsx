// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField, type TextFieldProps } from "@mui/material";

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          InputLabelProps={{
            required: true,
            sx: {
              "& .MuiInputLabel-asterisk": {
                color: "red",
              },
            },
          }}
        />
      )}
    />
  );
}
