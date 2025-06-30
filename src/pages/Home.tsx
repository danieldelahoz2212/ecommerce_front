import { Container, Box, Typography} from "@mui/material";
import { Cards, ProductCarousel, ProductRecommendation } from "../components/index";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Nuestros Productos
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ opacity: 0.7, maxWidth: "600px", margin: "0 auto" }}
          >
            Explora nuestra selección de productos de alta calidad. Encuentra lo
            que necesitas con la mejor garantía y diseño.
          </Typography>
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <ProductCarousel />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
          Catálogo De Productos
        </Typography>
        <ProductRecommendation />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <Cards />
      </motion.div>
    </Container>
  );
};
