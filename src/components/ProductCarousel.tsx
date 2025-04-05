import { Box, Typography, Grid, CardMedia, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Camiseta Premium",
    description: "Camiseta de algodón 100% de alta calidad",
    price: 29.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 2,
    name: "Sudadera Elegante",
    description: "Sudadera con capucha y bolsillos",
    price: 49.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 3,
    name: "Pantalón Deportivo",
    description: "Pantalón cómodo para el día a día",
    price: 39.99,
    image: "https://via.placeholder.com/250",
  },
];

export const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = products[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 3,
        p: 2,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        alignItems="center"
      >
        <Typography variant="h6">Ofertas destacadas</Typography>
        <Box display="flex" gap={1}>
          {products.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: idx === 0 ? "black" : "grey.300",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={3} alignItems="center" />
      <Grid item xs={12} md={6}>
        <Box position="relative">
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {product.description}
        </Typography>
        <Typography variant="h6" mt={2}>
          ${product.price}
        </Typography>
      </Grid>

      <IconButton
      onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "Background.paper",
          boxShadow: 1,
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "Background.paper",
          boxShadow: 1,
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};
