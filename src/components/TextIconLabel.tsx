import { type ReactElement } from "react";
// @mui
import { Stack, type StackProps, type SxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface Props extends StackProps {
  icon: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  endIcon?: boolean;
  sx?: SxProps;
}

export default function TextIconLabel({
  icon,
  value,
  endIcon = false,
  sx,
  ...other
}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        typography: "body2",
        ...sx,
      }}
      {...other}
    >
      {!endIcon && icon}
      {value}
      {endIcon && icon}
    </Stack>
  );
}
