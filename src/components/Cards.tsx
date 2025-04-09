import {
    Card,
    CardMedia,
    Grid,
    CardContent,
    Typography,
    Box,
    Button,
  } from "@mui/material";
  
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
      image: "https://picsum.photos/id/1011/400/300",
    },
    {
      id: 3,
      name: "Pantalón Deportivo",
      description: "Pantalón cómodo para el día a día",
      price: 39.99,
      image: "https://picsum.photos/id/1011/400/300",
    },
  ];
  
  export const Cards = () => {
    return (
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
              sx={{
                width: "100%",
                height: "100%",
                maxWidth: 345,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.name}
                  sx={{ backgroundColor: "#f0f0f0" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ textAlign: "center", mb: 1 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "justify", mb: 2 }}
                  >
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ textAlign: "center", color: "black" }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
                <Box sx={{ textAlign: "center", pb: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      width: "90%",
                      padding: "10px 0",
                      "&:hover": { backgroundColor: "#333" },
                    }}
                  >
                    Añadir al carrito
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };