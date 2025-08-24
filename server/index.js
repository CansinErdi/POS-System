import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import menuItemsRouter from "./routes/menuItems.js";

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 5001;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.send("OK");
  } catch (err) {
    res.status(500).send("Database unreachable");
  }
});

app.get("/", (req, res) => {
  res.send("Backend läuft");
});

// Menü-API einbinden
app.use("/api/menu", menuItemsRouter(pool));

const server = app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${port} ist bereits belegt. Bitte beende den anderen Prozess oder wähle einen anderen Port.`
    );
    process.exit(1);
  } else {
    throw err;
  }
});
