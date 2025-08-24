const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.category.upsert({
    where: { name: "Doner" },
    update: {},
    create: { name: "Doner" }
  });

  const products = [
    { name: "Döner Sandwich", priceCents: 650, categoryId: cat.id, sku: "DONER-SAND" },
    { name: "Dürüm",          priceCents: 700, categoryId: cat.id, sku: "DONER-DUR"  },
    { name: "Ayran",          priceCents: 200, categoryId: null,   sku: "AYRAN"     }
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: { name: p.name, priceCents: p.priceCents, categoryId: p.categoryId ?? null },
      create: p
    });
  }

  for (let i = 1; i <= 8; i++) {
    await prisma.diningTable.upsert({
      where: { label: `T${i}` },
      update: {},
      create: { label: `T${i}` }
    });
  }

  console.log("Seeded categories, products, tables");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
