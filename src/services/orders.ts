import { API_BASE_URL } from "../utils/apiConfig";
export const API_URL = `${API_BASE_URL}/orders`;

export async function getAllOrders() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");
  const res = await fetch(API_URL, {
    headers: { "Content-Type": "application/json", token },
  });

  if (!res.ok) throw new Error("Error al obtener pedidos");

  const data = await res.json();
  return Array.isArray(data) ? data : data.orders ?? [];
}
