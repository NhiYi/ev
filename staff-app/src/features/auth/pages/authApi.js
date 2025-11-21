// src/features/auth/authApi.js
import api from "../../services/api";

export async function loginRequest(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function registerRequest(data) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function fetchProfile(token) {
  const res = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function logoutRequest(refreshToken) {
  const res = await api.post("/auth/logout", { refreshToken });
  return res.data;
}
