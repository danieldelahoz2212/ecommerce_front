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
