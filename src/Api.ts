const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type Product = {
  id: number;
  name: string;
  priceCents: number;
  category?: { name: string } | null;
};

export async function getHealth() {
  const r = await fetch(`${API}/health`);
  if (!r.ok) throw new Error("Health check failed");
  return r.json() as Promise<{ status: string }>;
}

export async function getProducts(): Promise<Product[]> {
  const r = await fetch(`${API}/products`);
  if (!r.ok) throw new Error("Failed to load products");
  return r.json();
}

export async function createOrder(body: {
  tableLabel?: string;
  items: { productId: number; qty: number }[];
}) {
  const r = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error("Failed to create order");
  return r.json();
}