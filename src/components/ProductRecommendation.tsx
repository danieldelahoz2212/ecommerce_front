import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRef } from "react";

const products = [
  {
    id: 1,
    name: "Producto 1",
    description: "Descripción del producto 1",
    price: 29.99,
    image: "https://picsum.photos/id/1011/400/300",
  },
  {
    id: 2,
    name: "Producto 2",
    description: "Descripción del producto 2",
    price: 39.99,
    image: "https://picsum.photos/id/1011/400/300",
  },
  {
    id: 3,
    name: "Producto 3",
    description: "Descripción del producto 3",
    price: 49.99,
    image: "https://picsum.photos/id/1011/400/300",
  },
  {
    id: 4,
    name: "Producto 4",
    description: "Descripción del producto 4",
    price: 59.99,
    image: "https://picsum.photos/id/1011/400/300",
  },
];

export const ProductRecommendation = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = dir === "left" ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ position: "relative", my: 4 }}>
      <Box
        fontWeight="bold"
        sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
      >
        <Typography variant="h6">Productos que podrian interesarte</Typography>
        <Box>
          <IconButton onClick={() => scroll("left")}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={() => scroll("right")}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              minWidth: 220,
              maxWidth: 220,
              flex: "0 0 auto",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="h6" color="black">
                ${Math.round(product.price * 0.8).toFixed(2)}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    width: "80%",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  Agregar al carrito
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
