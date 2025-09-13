// src/context/AuthContext/authService.ts

const BASE_URL = "https://yieldlink-api-six.vercel.app/api"; // 👈 replace with backend base URL

export async function loginRequest(identifier: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) {
    let message = `Login failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
      else if (data?.error) message = data.error;
    } catch {}
    throw new Error(message);
  }

  return await res.json(); // expect { token, user }
}

export async function signupRequest(name: string, phone: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, phone, email, password }),
  });

  if (!res.ok) {
    let message = `Signup failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
      else if (data?.error) message = data.error;
    } catch {}
    throw new Error(message);
  }

  return await res.json(); // expect { token, user }
}
