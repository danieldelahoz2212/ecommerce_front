import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";

export const Login = () => {
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
      <Box
        component="form"
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
          />
          <TextField label="Contraseña" type="password" fullWidth required />
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
    </Container>
  );
};
