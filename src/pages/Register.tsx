import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { PasswordStrength } from "../components/index";
import { motion } from "framer-motion";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Register = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rol] = useState("3");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const isPasswordMatch =
    passwordConfirm !== "" && password !== passwordConfirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid || password !== passwordConfirm) {
      alert("Verifica tu contraseña.");
      return;
    }
    try {
      const res = await registerUser({ name, lastName, email, password, rol });
      if (res.status && res.token && res.user) {
        login(res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
      } else if (res.status && res.token) {
        // Si el backend no devuelve el usuario, solo guarda el token
        login(res.token);
        navigate("/");
      } else {
        alert("Error al registrar usuario");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error al registrar usuario");
      }
    }
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
          tabIndex={0}
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
            <TextField
              label="Nombre"
              type="text"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Apellido"
              type="text"
              fullWidth
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Correo Electrónico"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <PasswordStrength
              password={password}
              onValidChange={setIsPasswordValid}
            />

            <TextField
              label="Confirmar contraseña"
              type={showPasswordConfirm ? "text" : "password"}
              fullWidth
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={isPasswordMatch}
              helperText={isPasswordMatch ? "Las contraseñas no coinciden" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowPasswordConfirm((show) => !show)}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
