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
  if (!token) {
    throw new Error("No autenticado. Inicia sesión de nuevo.");
  }
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(data),
  });
  if (res.status === 401) {
    throw new Error("Sesión expirada o token inválido. Por favor, inicia sesión de nuevo.");
  }
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
}

export async function getAllUsers() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado. Inicia sesión de nuevo.");
  const res = await fetch(API_URL, {
    headers: { "Content-Type": "application/json", token },
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  const data = await res.json();
  return data.users;
}

export async function updateUserRole(email: string, rol: number) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado. Inicia sesión de nuevo.");
  const res = await fetch("http://localhost:3000/api/users/rol", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ email, rol }),
  });
  if (!res.ok) throw new Error("Error al actualizar rol");
  return res.json();
}

export async function getAllRoles() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado. Inicia sesión de nuevo.");
  const res = await fetch("http://localhost:3000/api/rol/", {
    headers: { "Content-Type": "application/json", token },
  });
  if (!res.ok) throw new Error("Error al obtener roles");
  const data = await res.json();
  return data.roles;
}
