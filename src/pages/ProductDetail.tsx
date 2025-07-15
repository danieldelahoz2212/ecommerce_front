import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box, Typography, Button, Paper, Grid, IconButton
} from "@mui/material";
import { useCart } from "../context/CartContext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const exampleProducts = [
  {
    id: 1,
    name: "Morral Gammatto Color Negro",
    description: "Morral resistente, ideal para uso diario. Capacidad 3L.",
    price: 99900,
    category: 1,
    stock: 25,
    cuotas: 3,
    envio: "Llega gratis mañana",
    devolucion: "Devolución gratis",
    images: [
      "https://picsum.photos/id/1011/400/400",
      "https://picsum.photos/id/1012/400/400",
      "https://picsum.photos/id/1013/400/400",
      "https://picsum.photos/id/1014/400/400",
      "https://picsum.photos/id/1015/400/400"
    ],
    color: "Negro",
    capacidad: "3 L",
    cupon: "Aplica $15.000 OFF. Compra mínima $200.000.",
    full: true
  }
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  stock: number;
  cuotas?: number;
  envio?: string;
  devolucion?: string;
  images?: string[];
  color?: string;
  capacidad?: string;
  cupon?: string;
  full?: boolean;
}

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imgIdx, setImgIdx] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const prod = exampleProducts.find((p) => String(p.id) === id);
    setProduct(prod || null);
    setImages(prod?.images ?? []);
    setImgIdx(0);
  }, [id]);

  if (!product) return <Box sx={{ mt: 8, textAlign: "center" }}><Typography>Producto no encontrado</Typography></Box>;

  return (
    <Box sx={{ mt: 6, maxWidth: 1100, mx: "auto" }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={2} sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", alignItems: "center", gap: 1 }}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`miniatura-${idx}`}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 4,
                  border: imgIdx === idx ? "2px solid #1976d2" : "1px solid #ccc",
                  cursor: "pointer"
                }}
                onClick={() => setImgIdx(idx)}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "relative", width: "100%", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {images.length > 0 ? (
                <>
                  <img
                    src={images[imgIdx]}
                    alt={`Producto imagen ${imgIdx + 1}`}
                    style={{ width: "100%", maxHeight: 350, objectFit: "contain", borderRadius: 8 }}
                  />
                  {images.length > 1 && (
                    <>
                      <IconButton
                        sx={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}
                        onClick={() => setImgIdx((prev) => prev === 0 ? images.length - 1 : prev - 1)}
                      >
                        <ChevronLeftIcon />
                      </IconButton>
                      <IconButton
                        sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }}
                        onClick={() => setImgIdx((prev) => prev === images.length - 1 ? 0 : prev + 1)}
                      >
                        <ChevronRightIcon />
                      </IconButton>
                    </>
                  )}
                </>
              ) : (
                <Box sx={{ width: "100%", height: 320, bgcolor: "#f3f3f3", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography color="text.secondary">Sin imágenes</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              ${product.price.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" color={product.stock > 0 ? "success.main" : "error"}>
              {product.stock > 0 ? `Stock disponible: ${product.stock}` : "Sin stock"}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, fontWeight: "bold", fontSize: 18 }}
              disabled={product.stock === 0}
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: images[0] || "",
                description: product.description,
              })}
            >
              Agregar al carrito
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
