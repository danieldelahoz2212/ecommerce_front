import { API_BASE_URL } from "../utils/apiConfig";
export const API_URL = `${API_BASE_URL}/users/login`;

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al iniciar sesión");
  return res.json();
}
