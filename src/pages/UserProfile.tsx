import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  Stack,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/userService";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import './UserProfile.css';
import { RoleManager } from "../components/RoleManager";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  img?: string | null;
  rol: number;
}

const getInitialForm = (user: User) => ({
  name: user.name,
  lastName: user.lastName,
  email: user.email,
  img: user.img || "",
  password: "",
});

export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    img: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed: User = JSON.parse(userData);
      setUser(parsed);
      setForm(getInitialForm(parsed));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    window.location.href = "/login";
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    if (user) setForm(getInitialForm(user));
    setEditMode(false);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, img: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const dataToSend: Partial<User> & { password?: string } = {
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        img: form.img || null,
      };
      if (form.password) dataToSend.password = form.password;
      const updated = await updateUserProfile(user.id.toString(), dataToSend);
      setUser({ ...user, ...updated.user });
      localStorage.setItem("user", JSON.stringify({ ...user, ...updated.user }));
      setEditMode(false);
      setForm(getInitialForm({ ...user, ...updated.user }));
      setSuccess("Perfil actualizado correctamente");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar perfil");
      } else {
        setError("Error al actualizar perfil");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="80vh" bgcolor="#f5f6fa" sx={{ mt: { xs: 8, md: 10 } }}>
      <Card sx={{ maxWidth: 440, width: '100%', borderRadius: 4, boxShadow: 6, p: { xs: 2, md: 3 }, mr: { md: 4 } }}>
        <CardContent>
          <Stack alignItems="center" mb={2}>
            <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
              Mi Perfil
            </Typography>
            <Avatar src={form.img || undefined} sx={{ width: 90, height: 90, mb: 2, bgcolor: '#e0e0e0', fontSize: 48 }} />
            {editMode && (
              <Button
                variant="outlined"
                component="label"
                sx={{ mt: 1, mb: 1 }}
              >
                Subir imagen
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            )}
          </Stack>
          <Stack spacing={2} mb={2}>
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !editMode }}
              size="medium"
            />
            <TextField
              label="Apellido"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !editMode }}
              size="medium"
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              InputProps={{ readOnly: !editMode }}
              size="medium"
            />
            <TextField
              label="Nueva contraseña"
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                readOnly: !editMode,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      disabled={!editMode}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={editMode ? "Deja vacío para no cambiar la contraseña" : ""}
              size="medium"
            />
          </Stack>
          <Box mb={2} textAlign="center">
            <Typography variant="subtitle1" fontWeight="bold">
              Rol: <span className={user.rol === 1 ? "role-admin" : "role-user"}>{user.rol === 1 ? "Administrador" : "Usuario"}</span>
            </Typography>
          </Box>
          {success && <Typography color="success.main" sx={{ mb: 2 }} align="center">{success}</Typography>}
          {error && <Typography color="error" sx={{ mb: 2 }} align="center">{error}</Typography>}
          {!editMode ? (
            <Button
              variant="contained"
              sx={{ mt: 1, width: '100%', fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff', ':hover': { bgcolor: '#115293' } }}
              onClick={handleEdit}
              size="large"
            >
              Editar perfil
            </Button>
          ) : (
            <Stack direction="row" spacing={2} mt={1} mb={1}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSave}
                disabled={loading}
                sx={{ flex: 1, fontWeight: 'bold' }}
                size="large"
              >
                Guardar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                disabled={loading}
                sx={{ flex: 1, fontWeight: 'bold' }}
                size="large"
              >
                Cancelar
              </Button>
            </Stack>
          )}
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2, width: '100%', fontWeight: 'bold', fontSize: 16 }}
            onClick={handleLogout}
            size="large"
          >
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
      {user.rol === 1 && (
        <Box sx={{ flex: 1, minWidth: 350, maxWidth: 500 }}>
          <RoleManager />
        </Box>
      )}
    </Box>
  );
};
