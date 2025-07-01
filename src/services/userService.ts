const API_URL = "http://localhost:3000/api/users";

export async function registerUser(data: {
  name: string;
  lastName: string;
  email: string;
  password: string;
  rol: string;
}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al registrar usuario");
  return res.json();
}

export async function updateUserProfile(id: string, data: {
  name?: string;
  lastName?: string;
  email?: string;
  img?: string | null;
  password?: string;
}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
}
