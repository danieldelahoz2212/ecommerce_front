import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";

export const Register = () => {
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
          <TextField label="Contraseña" type="password" fullWidth required />
          <TextField label="Confirmar contraseña" type="password" fullWidth required />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "grey.500",
              },
            }}
            fullWidth
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
