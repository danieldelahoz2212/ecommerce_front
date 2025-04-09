import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { useState } from "react";
import { PasswordStrength } from "../components/index";

export const Register = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const isPasswordMatch =
    passwordConfirm !== "" && password !== passwordConfirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid || password !== passwordConfirm) {
      alert("Verifica tu contraseña.");
      return;
    }
    console.log("Formulario válido ✅");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: 1,
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: "350px",
          boxShadow: 3,
          borderColor: "grey.300",
        }}
      >
        <Stack p={2}>
          <Typography variant="h4" align="justify">
            Registrarse
          </Typography>
          <Typography variant="subtitle1" align="justify" sx={{ opacity: 0.5 }}>
            Ingresa tus datos para registrarte
          </Typography>
        </Stack>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField label="Nombre" type="text" fullWidth required />
          <TextField label="Apellido" type="text" fullWidth required />
          <TextField
            label="Correo Electrónico"
            type="email"
            fullWidth
            required
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordStrength
            password={password}
            onValidChange={setIsPasswordValid}
          />

          <TextField
            label="Confirmar contraseña"
            type="password"
            fullWidth
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            error={isPasswordMatch}
            helperText={isPasswordMatch ? "Las contraseñas no coinciden" : ""}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isPasswordValid || password !== passwordConfirm}
            sx={{
              backgroundColor:
                !isPasswordValid || password !== passwordConfirm
                  ? "grey.400"
                  : "black",
              color: "white",
              "&:hover": {
                backgroundColor:
                  !isPasswordValid || password !== passwordConfirm
                    ? "grey.400"
                    : "grey.500",
              },
            }}
          >
            Registrarse
          </Button>
        </Stack>

        <Stack p={1}>
          <Typography>
            ¿Tienes cuenta?{" "}
            <Typography
              component="a"
              href="/login"
              sx={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              inicia sesión
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};
