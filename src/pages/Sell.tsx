import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  getAllProducts,
  createProduct,
  updateProduct,
} from "../services/productService";
import { getAllCategories } from "../services/categoryService";
import { SnackbarMessage } from "../components";

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: number;
  stock: number;
}

interface Category {
  id: number;
  name: string;
  status: number;
}

export const Sell = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: 1,
    stock: 0,
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: "success" | "error";
  }>({ open: false, message: "" });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.rol !== 1 && user.rol !== 2) {
        navigate("/");
        return;
      }
    } else {
      navigate("/login");
      return;
    }
    fetchProducts();
    fetchCategories();
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllProducts();
      setProducts(Array.isArray(data) ? data : data.products ?? []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setSnackbar({ open: true, message: err.message, severity: "error" });
      } else {
        setError("Error desconocido");
        setSnackbar({
          open: true,
          message: "Error desconocido",
          severity: "error",
        });
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setSnackbar({
        open: true,
        message: "Error al obtener categorías",
        severity: "error",
      });
    }
  };

  const handleOpen = (product?: Product) => {
    setEditProduct(product || null);
    setForm(
      product
        ? { ...product }
        : { name: "", description: "", price: 0, category: 1, stock: 0 }
    );
    setFormError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditProduct(null);
    setFormError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setFormLoading(true);
    setFormError("");
    try {
      if (editProduct) {
        await updateProduct(editProduct.id!, {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: Number(form.category),
          stock: Number(form.stock),
        });
        setSnackbar({
          open: true,
          message: "Producto actualizado correctamente",
          severity: "success",
        });
      } else {
        await createProduct({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: Number(form.category),
          stock: Number(form.stock),
        });
        setSnackbar({
          open: true,
          message: "Producto creado correctamente",
          severity: "success",
        });
      }
      await fetchProducts();
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
        setSnackbar({ open: true, message: err.message, severity: "error" });
      } else {
        setFormError("Error desconocido");
        setSnackbar({
          open: true,
          message: "Error desconocido",
          severity: "error",
        });
      }
    } finally {
      setFormLoading(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box sx={{ mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" mb={3} fontWeight="bold">
        Gestión de Productos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpen()}
      >
        Agregar Producto
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>
                  {categories.find((c) => c.id === Number(p.category))?.name ||
                    p.category}
                </TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpen(p)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editProduct ? "Editar Producto" : "Agregar Producto"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Precio"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Categoría"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            SelectProps={{ native: true }}
            inputProps={{ "aria-label": "Categoría", id: "category-select" }}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </TextField>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {formError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {formError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={formLoading}
          >
            {editProduct ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarMessage
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};
