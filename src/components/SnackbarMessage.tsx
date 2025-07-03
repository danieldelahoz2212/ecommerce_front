import { Snackbar, Alert } from "@mui/material";
import React from "react";

interface SnackbarMessageProps {
  open: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  autoHideDuration?: number;
  onClose: () => void;
}

export const SnackbarMessage: React.FC<SnackbarMessageProps> = ({
  open,
  message,
  severity = "info",
  autoHideDuration = 3000,
  onClose,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);
