import {
  Box,
  Typography,
  Grid,
  CardMedia,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Camiseta Premium",
    description: "Camiseta de algodón 100% de alta calidad",
    price: 29.99,
    image: "https://picsum.photos/id/1011/400/300",
  },
  {
    id: 2,
    name: "Sudadera Elegante",
    description: "Sudadera con capucha y bolsillos",
    price: 49.99,
    image: "https://picsum.photos/id/1015/400/300",
  },
  {
    id: 3,
    name: "Pantalón Deportivo",
    description: "Pantalón cómodo para el día a día",
    price: 39.99,
    image: "https://picsum.photos/id/1025/400/300",
  },
];

export const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = products[currentIndex];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambia cada 4 segundos
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

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
                bgcolor: idx === currentIndex ? "black" : "grey.300",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </Box>
      </Box>
      <Divider
        sx={{
          mb: 3,
          borderBottomWidth: 2,
          borderColor: "grey.300",
          opacity: 1,
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    borderRadius: 2,
                    objectFit: "cover",
                    height: 300,
                    width: "70%",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {product.description}
              </Typography>
              <Typography variant="h6" mt={2} fontWeight="bold">
                ${product.price}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  width: "70%",
                  padding: "10px 0",
                  "&:hover": { backgroundColor: "#333" },
                }}
                onClick={() => addToCart(product)}
              >
                Añadir al carrito
              </Button>
            </Grid>
          </Grid>
        </motion.div>
      </AnimatePresence>
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "background.paper",
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
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};
