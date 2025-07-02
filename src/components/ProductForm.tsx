import { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { createProduct, updateProduct } from "../services/productService";

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: number;
  stock: number;
}

interface ProductFormProps {
  initialProduct?: Product;
  onSave?: (product: Product) => void;
}

export const ProductForm = ({ initialProduct, onSave }: ProductFormProps) => {
  const [form, setForm] = useState<Product>(
    initialProduct || {
      name: "",
      description: "",
      price: 0,
      category: 1,
      stock: 0,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (form.id) {
        await updateProduct(form.id, {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: Number(form.category),
          stock: Number(form.stock),
        });
        setSuccess("Producto actualizado");
      } else {
        await createProduct({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: Number(form.category),
          stock: Number(form.stock),
        });
        setSuccess("Producto creado");
      }
      if (onSave) onSave(form);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al guardar producto");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, border: 1, borderRadius: 2, borderColor: 'grey.300', background: '#fff', maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" mb={2}>{form.id ? "Editar producto" : "Crear producto"}</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Nombre" name="name" value={form.name} onChange={handleChange} required fullWidth />
          <TextField label="Descripción" name="description" value={form.description} onChange={handleChange} required fullWidth />
          <TextField label="Precio" name="price" type="number" value={form.price} onChange={handleChange} required fullWidth />
          <TextField label="Categoría" name="category" type="number" value={form.category} onChange={handleChange} required fullWidth />
          <TextField label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} required fullWidth />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {form.id ? "Actualizar" : "Crear"}
          </Button>
          {success && <Typography color="success.main">{success}</Typography>}
          {error && <Typography color="error.main">{error}</Typography>}
        </Stack>
      </form>
    </Box>
  );
};
