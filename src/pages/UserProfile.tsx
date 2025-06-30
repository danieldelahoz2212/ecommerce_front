import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import './UserProfile.css';

interface User {
  name: string;
  lastName: string;
  email: string;
  rol: number;
}

export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    window.location.href = "/login";
  };

  if (!user) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ maxWidth: 400, width: '100%', borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Mi Perfil
          </Typography>
          <Typography sx={{ mb: 2 }}><strong>Nombre:</strong> {user.name}</Typography>
          <Typography sx={{ mb: 2 }}><strong>Apellido:</strong> {user.lastName}</Typography>
          <Typography sx={{ mb: 2 }}><strong>Email:</strong> {user.email}</Typography>
          <Typography sx={{ mb: 2 }}><strong>Rol:</strong> {user.rol === 1 ? "Administrador" : "Usuario"}</Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2, width: '100%' }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
