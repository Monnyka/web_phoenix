const SAMPLE_LOGIN_RESPONSE = {
  user: {
    name: "test",
  },
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTMwMTM2NDdiYjQ2YTM3MmY2NWM0NjYiLCJuYW1lIjoidGVzdCIsImlhdCI6MTc4MTUzNjcyMCwiZXhwIjoxNzg0MTI4NzIwfQ.KtX8P6yEtS6zCsprmBPxH3W1NrA-zO3EkJrwcg__SYM",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTMwMTM2NDdiYjQ2YTM3MmY2NWM0NjYiLCJuYW1lIjoidGVzdCIsImlhdCI6MTc4MTUzNjcyMCwiZXhwIjoxNzgyMTQxNTIwfQ.4ykdbeAZhDfdTAfLfmMvfApjtTAdbtIcUmlUouarQm8",
};

export async function loginRequest(email, password) {
  const payload = { email, password };
  const endpoint = import.meta.env.VITE_LOGIN_URL;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Login failed. Please verify your credentials.");
    }

    return response.json();
  }

  if (email === "test@gmail.com" && password === "123456") {
    return SAMPLE_LOGIN_RESPONSE;
  }

  throw new Error("Invalid email or password.");
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
