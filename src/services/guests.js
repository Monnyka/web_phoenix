const API_BASE_URL = (
  import.meta.env.BASE_API_URL ||
  import.meta.env.VITE_BASE_API_URL ||
  "https://api-dev-phoenix.monnykapin.com/api/v1"
).replace(/\/$/, "");

const GUESTS_API_BASE = `${API_BASE_URL}/guests`;

function normalizeGuestsResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.guests)) {
    return payload.guests;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
}

export async function fetchGuests(accessToken, options = {}) {
  const { offset = 0, limit = 25 } = options;
  const headers = {
    Accept: "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const query = new URLSearchParams({
    completed: "false",
    offset: String(offset),
    limit: String(limit),
  });

  const response = await fetch(`${GUESTS_API_BASE}?${query.toString()}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Unable to load guests list.");
  }

  const payload = await response.json();
  return normalizeGuestsResponse(payload);
}

export async function updateGuestStatus(accessToken, guestId, status) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${GUESTS_API_BASE}/${guestId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Unable to update guest status.");
  }

  const payload = await response.json();
  return payload?.guest || payload?.data || payload;
}

export async function createGuest(accessToken, guestData) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(GUESTS_API_BASE, {
    method: "POST",
    headers,
    body: JSON.stringify(guestData),
  });

  if (!response.ok) {
    throw new Error("Unable to create monetary contribution.");
  }

  const payload = await response.json();
  return payload?.guest || payload?.data || payload;
}

export async function deleteGuest(accessToken, guestId) {
  const headers = {
    Accept: "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${GUESTS_API_BASE}/${guestId}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error("Unable to delete monetary contribution.");
  }

  return true;
}
