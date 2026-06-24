const API_BASE_URL =
  window.__ENV__?.BASE_API_URL || import.meta.env.BASE_API_URL || "";
const LOGIN_URL = `${API_BASE_URL.replace(/\/$/, "")}/auth/login`;

export async function loginRequest(email, password) {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed. Please verify your credentials.");
  }

  return response.json();
}

export function saveAuthSession(data) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.user));
}

export function clearAuthSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

export function getStoredUser() {
  const rawUser = localStorage.getItem("user");
  return rawUser ? JSON.parse(rawUser) : null;
}

export function hasAccessToken() {
  return Boolean(localStorage.getItem("accessToken"));
}

export function getAccessToken() {
  return localStorage.getItem("accessToken") || "";
}