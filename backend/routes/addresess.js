import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { user_id, phone } = req.query;

  try {
    let query;
    let params;

    if (user_id) {
      query = `
        SELECT * FROM user_adresses 
        WHERE user_id = $1
        ORDER BY is_default DESC, created_at DESC
        `;

      params = [user_id];
    } else if (phone) {
      query = `
         SELECT ua.*
         FROM user_adresses ua
         LEFT JOIN users_info ui ON ui.id = ua.user_id
         WHERE u.phone = $1
         ORDER BY ua.is_dafault DESC, ua.created_at DESC
        `;

      params = [phone.trim()];
    }

    const { rows } = await pool.query(query, params);

    return res.status(200).json({ address: rows });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { user_id, title, icon, street, city, details, is_default } = req.body;
  try {
    if (!street) {
      return res
        .status(400)
        .json({ message: "Provide your street, it's required " });
    }

    const query = `
    INSERT INTO user_adresses 
    (user_id, title, icon, street, city, details, is_default) VALUES
    ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;

    const values = [
      user_id || null,
      title || "Home",
      icon || "📍",
      street.trim(),
      city || "New York, NY",
      details || null,
      Boolean(is_default),
    ];

    const { rows } = await pool.query(query, values);

    return res.status(201).json({ address: rows[0] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
