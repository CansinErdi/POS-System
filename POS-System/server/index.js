import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.send('OK');
  } catch (err) {
    res.status(500).send('Database unreachable');
  }
});

app.get('/', (req, res) => {
  res.send('Backend läuft');
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
