import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  Person,
  Login,
  AppRegistration,
} from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SnackbarMessage } from "../components";

export const NavBar = () => {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: "success" | "info" }>({
    open: false,
    message: "",
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setSnackbar({ open: true, message: "Sesión cerrada correctamente", severity: "success" });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1200);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleDrawerNavigate = (path: string) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            align="justify"
            component="div"
            sx={{ flexGrow: 2, color: "black", fontWeight: "bold" }}
          >
            Ecommerce
          </Typography>
          {isAuthenticated ? (
            <>
              <Button
                onClick={handleLogout}
                size="small"
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  borderRadius: 2,
                  color: "black",
                  border: 1,
                  borderColor: "grey.300",
                  boxShadow: 1,
                  ml: 1,
                  px: 1.5,
                  py: 0.5,
                  fontSize: 12,
                }}
              >
                Cerrar sesión
              </Button>

              <Button
                component={Link}
                to="/user"
                size="small"
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  borderRadius: 2,
                  color: "black",
                  border: 1,
                  borderColor: "grey.300",
                  boxShadow: 1,
                  fontSize: 12,
                  px: 1.5,
                  py: 0.5,
                  ml: 1,
                }}
              >
                Mi Perfil
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                size="small"
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  borderRadius: 2,
                  border: 1,
                  borderColor: "grey.300",
                  boxShadow: 1,
                  color: "black",
                  fontSize: 12,
                  px: 1.5,
                  py: 0.5,
                  ml: 1,
                }}
              >
                Iniciar Sesión
              </Button>
              <Button
                component={Link}
                to="/register"
                size="small"
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  borderRadius: 2,
                  color: "white",
                  backgroundColor: "black",
                  border: 1,
                  borderColor: "grey.300",
                  boxShadow: 1,
                  fontSize: 12,
                  px: 1.5,
                  py: 0.5,
                  ml: 1,
                  "&:hover": {
                    backgroundColor: "grey.500",
                  },
                }}
              >
                Registrarse
              </Button>
            </>
          )}
          <IconButton
            sx={{ color: "black", ml: 2 }}
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleDrawerNavigate("/")}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleDrawerNavigate("/cart")}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Carrito" />
              </ListItemButton>
            </ListItem>
            {isAuthenticated ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleDrawerNavigate("/user")}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Mi Perfil" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <Login />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesión" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleDrawerNavigate("/login")}>
                    <ListItemIcon>
                      <Login />
                    </ListItemIcon>
                    <ListItemText primary="Iniciar Sesión" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleDrawerNavigate("/register")}>
                    <ListItemIcon>
                      <AppRegistration />
                    </ListItemIcon>
                    <ListItemText primary="Registrarse" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleDrawerNavigate("/sell")}>
                <ListItemIcon>
                  <AppRegistration />
                </ListItemIcon>
                <ListItemText primary="Gestión de Productos" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <SnackbarMessage
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};
