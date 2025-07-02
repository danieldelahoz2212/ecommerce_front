import { API_BASE_URL } from "../utils/apiConfig";
export const API_URL = `${API_BASE_URL}/products`;


export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  category: number;
  stock: number;
}) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

export async function updateProduct(id: number, product: {
  name: string;
  description: string;
  price: number;
  category: number;
  stock: number;
}) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

export async function getAllProducts() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  if (!res.ok) throw new Error("Error al obtener productos");
  const data = await res.json();
  // Si la respuesta es { products: [...] }, retorna solo el array
  return Array.isArray(data) ? data : (data.products ?? []);
}
