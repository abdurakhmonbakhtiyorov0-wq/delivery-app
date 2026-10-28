import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM restaurants");

    return res.status(200).json({ restaurants: rows });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    id,
    name,
    cuisine,
    rating,
    reviews_count,
    delivery_time,
    delivery_fee,
    min_order,
    tag,
    price_range,
    image,
    featured_dish,
  } = req.body;

  try {
    const restaurantId = id || "res" + Date.now();

    if (!name || !cuisine || !price_range || !image || !delivery_time) {
      return res.status(400).json({ message: "Provide all the fields" });
    }

    const query = `
    INSERT INTO restaurants (
    id,
    name,
    cuisine,
    rating,
    reviews_count,
    delivery_time,
    delivery_fee,
    min_order,
    tag,
    price_range,
    image,
    featured_dish
    ) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
   `;

    const value = [
      restaurantId,
      name.trim(),
      cuisine.trim(),
      rating !== undefined ? Number(rating) : 4.8,
      reviews_count !== undefined ? Number(reviews_count) : 0,
      delivery_time || "25-30",
      delivery_fee !== undefined ? Number(delivery_fee) : 0.0,
      min_order !== undefined ? Number(min_order) : 10.0,
      tag || null,
      price_range || "$$",
      image.trim(),
      featured_dish ? featured_dish.trim() : null,
    ];

    const { rows } = await pool.query(query, value);

    return res.status(201).json({ restaurent: rows[0] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
