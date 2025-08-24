import express from "express";

const router = express.Router();

export default (pool) => {
  // Get all menu items
  router.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM menu_items");
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // Get a single menu item
  router.get("/:id", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM menu_items WHERE id = $1",
        [req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // Create a new menu item
  router.post("/", async (req, res) => {
    try {
      const { name, price } = req.body;
      const result = await pool.query(
        "INSERT INTO menu_items (name, price) VALUES ($1, $2) RETURNING *",
        [name, price]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // Update a menu item
  router.put("/:id", async (req, res) => {
    try {
      const { name, price } = req.body;
      const result = await pool.query(
        "UPDATE menu_items SET name = $1, price = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
        [name, price, req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  // Delete a menu item
  router.delete("/:id", async (req, res) => {
    try {
      const result = await pool.query(
        "DELETE FROM menu_items WHERE id = $1 RETURNING *",
        [req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

  return router;
};
