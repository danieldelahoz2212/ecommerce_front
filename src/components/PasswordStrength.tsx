import {
  Box,
  LinearProgress,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useEffect, useState } from "react";

interface PasswordStrengthProps {
  password: string;
  onValidChange: (isValid: boolean) => void;
}

interface RequirementItemProps {
  label: string;
  fulfilled: boolean;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  onValidChange,
}) => {
  const [strength, setStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setRequirements({
      length,
      uppercase,
      lowercase,
      number,
      special,
    });

    const strengthScore = [
      length,
      uppercase,
      lowercase,
      number,
      special,
    ].filter(Boolean).length;

    const calculatedStrength = (strengthScore / 5) * 100;
    setStrength(calculatedStrength);

    const isValid = calculatedStrength >= 80;
    onValidChange(isValid);
  }, [password, onValidChange]);

  const getStrengthLabel = () => {
    if (strength < 40) return "Débil";
    if (strength < 80) return "Moderada";
    return "Fuerte";
  };

  const getStrengthColor = () => {
    if (strength < 40) return "error";
    if (strength < 80) return "warning";
    return "success";
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2">Seguridad de la contraseña</Typography>
        <Typography
          variant="subtitle2"
          color={
            strength < 40 ? "error" : strength < 80 ? "warning" : "success"
          }
          fontWeight={500}
        >
          {getStrengthLabel()}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={strength}
        color={getStrengthColor()}
        sx={{ height: 8, borderRadius: 4, my: 1 }}
      />
      <List dense />
      <RequirementItem
        label="Al menos 8 caracteres"
        fulfilled={requirements.length}
      />
      <RequirementItem
        label="Al menos una letra mayúscula (A-Z)"
        fulfilled={requirements.uppercase}
      />
      <RequirementItem
        label="Al menos una letra minúscula (a-z)"
        fulfilled={requirements.lowercase}
      />
      <RequirementItem
        label="Al menos un número (0-9)"
        fulfilled={requirements.number}
      />
      <RequirementItem
        label="Al menos un carácter especial (!@#$%^&*(),.?\:{}|<>)"
        fulfilled={requirements.special}
      />
    </Box>
  );
};

const RequirementItem: React.FC<RequirementItemProps> = ({
  label,
  fulfilled,
}) => (
  <ListItem sx={{ py: 0.5 }}>
    <ListItemIcon sx={{ minWidth: 32 }}>
      {fulfilled ? (
        <CheckCircleIcon color="success" fontSize="small" />
      ) : (
        <CancelIcon color="error" fontSize="small" />
      )}
    </ListItemIcon>
    <ListItemText
      primary={label}
      primaryTypographyProps={{
        color: fulfilled ? "text.primary" : "error",
        fontSize: 14,
      }}
    />
  </ListItem>
);
