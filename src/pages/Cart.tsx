import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    qty?: number;
  };

  const grouped = cart.reduce<Record<string, Product & { qty: number }>>((acc, prod) => {
    acc[prod.id] = acc[prod.id] || { ...prod, qty: 0 };
    acc[prod.id].qty++;
    return acc;
  }, {});
  const products = Object.values(grouped);
  const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <Box sx={{ p: { xs: 1, md: 4 } }}>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Volver a la tienda
      </Button>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Carrito de Compras
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Revisa tus productos y completa tu compra
      </Typography>
      <Box sx={{ background: "#fafbfc", borderRadius: 2, p: 2, minHeight: 200, border: '1px solid #e0e0e0' }}>
        {products.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={180}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Tu carrito está vacío
            </Typography>
            <Button variant="contained" component={Link} to="/" sx={{ bgcolor: "#2563eb" }}>
              Explorar productos
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Productos ({products.length})
              </Typography>
              {products.map((product: Product & { qty: number }) => (
                <Card key={product.id} sx={{ display: "flex", mb: 2, alignItems: "center", p: 1 }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{ width: 80, height: 80, borderRadius: 2, bgcolor: "#f3f3f3" }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography fontWeight="bold">{product.name}</Typography>
                    <Typography color="text.secondary">${product.price}</Typography>
                  </CardContent>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button variant="outlined" size="small" onClick={() => decreaseQty(Number(product.id))}>-</Button>
                    <TextField value={product.qty} size="small" sx={{ width: 40 }} inputProps={{ readOnly: true, style: { textAlign: 'center' } }} />
                    <Button variant="outlined" size="small" onClick={() => increaseQty(Number(product.id))}>+</Button>
                  </Box>
                  <IconButton color="error" sx={{ ml: 1 }} onClick={() => removeFromCart(Number(product.id))}>
                    <DeleteIcon />
                  </IconButton>
                </Card>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Resumen del pedido
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Envío</Typography>
                  <Typography>Gratis</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography fontWeight="bold">Total</Typography>
                  <Typography fontWeight="bold">${subtotal.toFixed(2)}</Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth>
                  Realizar pedido
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};
