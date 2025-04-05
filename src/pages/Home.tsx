import { Container, Box, Typography } from "@mui/material";
import { Cards, ProductCarousel } from "../components/index";
export const Home = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "justify",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" fontWeight="blod" gutterBottom>
          Nuestros Productos
        </Typography>
        <Typography
          variant="subtitle1"
          align="justify"
          sx={{ opacity: 0.7, maxWidth: "600px", margin: "0 auto" }}
        >
          Explora nuestra selección de productos de alta calidad. Encuentra lo
          que necesitas con la mejor garantía y diseño.
        </Typography>
      </Box>
      <ProductCarousel/>
      <Cards />
    </Container>
  );
};
