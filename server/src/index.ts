import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/products", async (_req, res) => {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
    include: { category: true }
  });
  res.json(products);
});

const createOrderSchema = z.object({
  tableLabel: z.string().optional(),
  items: z.array(z.object({
    productId: z.number().int().positive(),
    qty: z.number().int().positive()
  })).min(1)
});

app.post("/orders", async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const { tableLabel, items } = parsed.data;

  const table = tableLabel
    ? await prisma.diningTable.findUnique({ where: { label: tableLabel } })
    : null;

  const order = await prisma.order.create({
    data: {
      tableId: table?.id ?? null,
      items: {
        create: await Promise.all(items.map(async it => {
          const p = await prisma.product.findUnique({ where: { id: it.productId } });
          if (!p) throw new Error(`Product ${it.productId} not found`);
          return { productId: p.id, qty: it.qty, priceCents: p.priceCents };
        }))
      }
    },
    include: { items: true }
  });

  res.status(201).json(order);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
