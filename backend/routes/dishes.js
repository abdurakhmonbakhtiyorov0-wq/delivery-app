import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { category, restaurant_id, search } = req.query;

  try {
    let query = `SELECT * FROM dishes WHERE is_available = true`;
    const params = [];

    if (category && category !== "All") {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    if (restaurant_id) {
      params.push(restaurant_id);
      query += `AND restaurant_id = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.trim().toLowerCase()}%`);
      query += `AND (LOWER(name) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`;
    }

    query += ` ORDER BY rating DESC `;

    const { rows } = await pool.query(query, params);

    return res.status(200).json({ dishes: rows });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { dish_id } = String(req.params);

  try { 
    const { rows } = await pool.query("SELECT * FROM dishes WHERE id = $1", [
      dish_id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Dish which searched not found" });
    }

    return res
      .status(200)
      .json({ message: "Dish successfully found", item: rows });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    id,
    restaurant_id,
    name,
    description,
    price,
    old_price,
    rating,
    reviews_count,
    prep_time,
    calories,
    tag,
    spicy,
    vegaterian,
    image,
    is_available,
    category,
  } = req.body;

  const dish_id = id || "dish-" + Date.now();

  try {
    if (!name || price === undefined || price === null || !image) {
      return res
        .status(400)
        .json({ message: "Provide all the required fields" });
    }

    const query = `
    INSERT INTO dishes 
    (
    id,
    restaurant_id,
    name,
    description,
    price,
    old_price,
    rating,
    reviews_count,
    prep_time,
    calories,
    tag,
    spicy,
    vegaterian,
    image,
    is_available,
    category
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *
    `;

    const values = [
      dish_id,
      restaurant_id || null,
      name.trim(),
      description ? description.trim() : null,
      Number(price),
      old_price !== undefined && old_price !== null ? Number(old_price) : null,
      rating !== undefined && rating !== null ? Number(rating) : null,
      reviews_count !== undefined || reviews_count !== null
        ? Number(reviews_count)
        : 0,
      prep_time || "25-30 min",
      calories || null,
      tag ? tag.trim() : null,
      Boolean(spicy),
      Boolean(vegaterian),
      image.trim(),
      is_available !== undefined ? Boolean(is_available) : true,
      category || null,
    ];

    const { rows } = pool.query(query, values);

    return res.status(201).json({ dish: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
