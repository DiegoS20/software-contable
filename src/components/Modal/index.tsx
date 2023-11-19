"use client";

import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import MUIModal from "@mui/material/Modal";
import { ModalOwnProps } from "@mui/base";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
};

export default function Modal({ children, ...modalProps }: Props) {
  return (
    <MUIModal {...modalProps} disablePortal>
      <Box sx={style}>{children}</Box>
    </MUIModal>
  );
}

type Props = PropsWithChildren<ModalOwnProps>;
