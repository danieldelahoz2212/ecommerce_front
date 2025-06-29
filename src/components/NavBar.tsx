import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useCart } from "../context/CartContext";

export const NavBar = () => {
  const { cart } = useCart();
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
          <Button
            href="/login"
            sx={{
              display: { xs: "none", md: "inline-flex" },
              borderRadius: 3,
              border: 1,
              borderColor: "grey.300",
              boxShadow: 3,
              color: "black",
              "&:hover": {
                backgroundColor: "grey.200",
              },
            }}
          >
            Iniciar Sesión
          </Button>

          <Button
            href="/register"
            sx={{
              display: { xs: "none", md: "inline-flex" },
              borderRadius: 3,
              color: "inherit",
              border: 1,
              borderColor: "grey.300",
              boxShadow: 3,
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "grey.500",
              },
              ml: 2,
            }}
          >
            Registrarse
          </Button>
          <IconButton sx={{ color: "black", ml: 2 }} href="#carrito">
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
