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
import { motion } from "framer-motion";

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
    console.log("Formulario válido");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "140vh",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
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
            padding: { xs: 2, sm: 4 },
            borderRadius: 3,
            width: "100%",
            maxWidth: { xs: "100%", sm: "350px" },
            boxShadow: 3,
            borderColor: "grey.300",
            margin: "0 auto",
          }}
        >
          <Stack p={2} spacing={1} sx={{ width: "100%" }}>
            <Typography variant="h5" align="center">
              Registrarse
            </Typography>
            <Typography variant="body2" align="center" sx={{ opacity: 0.6 }}>
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
                      : "grey.700",
                },
              }}
            >
              Registrarse
            </Button>
          </Stack>

          <Stack p={2}>
            <Typography variant="body2" align="center">
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
                Inicia sesión
              </Typography>
            </Typography>
          </Stack>
        </Box>
      </motion.div>
    </Container>
  );
};
