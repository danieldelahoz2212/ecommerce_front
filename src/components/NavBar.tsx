import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export const NavBar = () => {
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
            sx={{ flexGrow: 2, color: "black", fontWeight: "bold"  }}
          >
            Ecommerce
          </Typography>
          <Button
            href="/login"
            sx={{
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
            Iniciar Sesion
          </Button>
          <Button
            href="/register"
            sx={{
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
