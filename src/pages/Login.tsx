import { useState } from "react";
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
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/loginService";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      if (res.token && res.user) {
        login(res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/user");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Error al iniciar sesión");
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
        minHeight: "100vh",
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
            padding: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: "350px",
            boxShadow: 3,
            borderColor: "grey.300",
            margin: "0 auto",
          }}
        >
          <Stack p={2}>
            <Typography variant="h4" align="justify">
              Inicio De Sesión
            </Typography>
            <Typography variant="subtitle1" align="justify" sx={{ opacity: 0.5 }}>
              Inicia sesión para acceder a la plataforma
            </Typography>
          </Stack>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <TextField
              label="Correo Electrónico"
              type="email"
              fullWidth
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "grey.800",
                },
              }}
              fullWidth
            >
              Iniciar Sesión
            </Button>
          </Stack>
          <Stack p={1}>
            <Typography>
              ¿No tienes cuenta?{" "}
              <Typography
                component="a"
                href="/register"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Regístrate
              </Typography>
            </Typography>
          </Stack>
        </Box>
      </motion.div>
    </Container>
  );
};
