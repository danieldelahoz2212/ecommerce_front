import { useEffect, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  Typography,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  getAllUsers,
  updateUserRole,
  getAllRoles,
} from "../services/userService";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  rol: number;
}

interface Role {
  id: number;
  rol: string;
}

export const RoleManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const [selectedRole, setSelectedRole] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => setError("Error al cargar usuarios"));
    getAllRoles()
      .then(setRoles)
      .catch(() => setError("Error al cargar roles"));
  }, []);

  const handleChangeRole = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const user = users.find((u) => u.id === selectedUser);
      if (!user) throw new Error("Usuario no encontrado");
      console.log("Enviando:", { email: user.email, rol: selectedRole });
      await updateUserRole(user.email, selectedRole as number);
      setSuccess("Rol actualizado correctamente");
    } catch {
      setError("Error al actualizar rol");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        border: 1,
        borderRadius: 2,
        borderColor: "grey.300",
        background: "#fff",
      }}
    >
      <Typography variant="h6" mb={2}>
        Gestión de Roles
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Usuario</InputLabel>
        <Select
          value={selectedUser}
          label="Usuario"
          onChange={(e) => setSelectedUser(Number(e.target.value))}
        >
          {users.map((u) => (
            <MenuItem key={u.id} value={u.id}>
              {u.name} {u.lastName} ({u.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Rol</InputLabel>
        <Select
          value={selectedRole}
          label="Rol"
          onChange={(e) => setSelectedRole(Number(e.target.value))}
        >
          {roles.map((r) => (
            <MenuItem key={r.id} value={r.id}>
              {r.rol}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleChangeRole}
        disabled={loading || !selectedUser || !selectedRole}
      >
        Cambiar Rol
      </Button>
      {success && (
        <Typography color="success.main" mt={2}>
          {success}
        </Typography>
      )}
      {error && (
        <Typography color="error.main" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
