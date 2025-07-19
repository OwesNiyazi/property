const API_BASE = "http://localhost:5000/api";

export async function registerUser(data: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getProperties() {
  const res = await fetch(`${API_BASE}/properties`);
  return res.json();
}

export async function getUserProperties(userId: string) {
  const res = await fetch(`${API_BASE}/properties?userId=${userId}`);
  return res.json();
}

export async function createProperty(data: any, images: File[]) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  images.forEach((img) => formData.append("images", img));
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user && user.id) {
    formData.append("userId", user.id);
  }
  const res = await fetch(`${API_BASE}/properties`, {
    method: "POST",
    body: formData,
    headers: user ? {} : {},
  });
  return res.json();
}

export async function updateProperty(id: string, data: any, images: File[] = [], keepImages: string[] = []) {
  const formData = new FormData();
  
  // Add all form data
  for (const key in data) {
    formData.append(key, data[key]);
  }
  
  // Add new images
  images.forEach((img) => formData.append("images", img));
  
  // Add existing images to keep
  if (keepImages.length > 0) {
    formData.append("keepImages", JSON.stringify(keepImages));
  }
  
  const res = await fetch(`${API_BASE}/properties/${id}`, {
    method: "PUT",
    body: formData,
  });
  return res.json();
}

export async function deleteProperty(id: string) {
  const res = await fetch(`${API_BASE}/properties/${id}`, {
    method: "DELETE" });
  return res.json();
} 