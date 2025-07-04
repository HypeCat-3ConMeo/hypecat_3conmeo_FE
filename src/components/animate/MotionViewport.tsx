import { m, type MotionProps } from "framer-motion";
import { type ReactNode } from "react";
// @mui
import { Box, type BoxProps } from "@mui/material";
// hooks
// import useResponsive from '../../hooks/useResponsive';
//
import { varContainer } from ".";

// ----------------------------------------------------------------------

type IProps = BoxProps & MotionProps;

interface Props extends IProps {
  children: ReactNode;
  disableAnimatedMobile?: boolean;
}

export default function MotionViewport({
  children,
  disableAnimatedMobile = true,
  ...other
}: Props) {
  // const isDesktop = useResponsive('up', 'sm');

  if (disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
