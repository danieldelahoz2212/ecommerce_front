import { API_BASE_URL } from "../utils/apiConfig";

export async function getAllCategories() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");
  const res = await fetch(`${API_BASE_URL}/category`, {
  });
  if (!res.ok) throw new Error("Error al obtener categorías");
  const data = await res.json();
  return Array.isArray(data) ? data : (data.categorys ?? []);
}
