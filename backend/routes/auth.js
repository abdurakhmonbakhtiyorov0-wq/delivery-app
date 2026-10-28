import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.post("/checkout", async (req, res) => {
  const { name, phone, email, address } = req.body;

  try {
    if (!name || !phone || !address) {
      return res.status(400).json({ message: "Provide all required fields" });
    }

    const query = `INSERT INTO users_info (name, phone, email, address, updated_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) ON CONFLICT (phone) DO UPDATE SET name = EXCLUDED.name , address = EXCLUDED.address, email = COALESCE(EXCLUDED.email , users_info.email), updated_at = CURRENT_TIMESTAMP RETURNING *`;

    const values = [
      name.trim(),
      phone,
      email ? email.trim() : null,
      address || "",
    ];

    const { rows } = await   pool.query(query, values);

    return res.status(201).json({ user: rows[0] });
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({message:"Server error"})
  }
});

export default router;
