import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { phone } = req.query;

  try {
    if (!phone) {
      return res.status(400).json({ message: "Provide your phone number" });
    }

    const query = `
    SELECT o.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'dish_id', oi.dish_id,
              'dish_name', oi.dish_name,
              'price', oi.price,
              'quantity', oi.quantity,
              'image', oi.image
            )
          ) FILTER (WHERE oi.id IS NOT NULL), '[]'::json
        ) AS items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE o.customer_phone = $1
    GROUP BY o.id
    ORDER BY created_at DESC
    `;

    const { rows } = await pool.query(query, [phone.trim()]);

    return res.status(200).json({ orders: rows });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
    SELECT o.*,
      COLESCE(
       json_agg(
        json_build_object(
         'dish_name', oi.dish_name,
         'price', oi.price,
         'quantity', oi.quantity,
         'image', oi.image
        )
       )FILTER (WHERE oi.id IS NOT NULL), '[]'::json 
      )AS items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE oi.id = $1
      GROUP BY o.id       
    `;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return req.status(400).json({ message: "Order not found " });
    }

    return res.status(200).json({ orders: rows[0] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    customer_name,
    customer_phone,
    delivery_address,
    delivery_mode,
    payment_method,
    subtotal,
    delivery_fee,
    service_fee,
    discount_amount,
    promo_code,
    tip,
    total,
    items,
  } = req.body;

  if (!customer_phone || !items || items.length === 0 || !delivery_address) {
    return res.status(400).json({ message: "Provide all the required fields" });
  }

  const orderId = "FR-" + Math.floor(10000 + Math.random() * 90000);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const query = `
   INSERT INTO orders (
     id,
     customer_name,
     customer_phone,
     delivery_address,
     delivery_mode,
     payment_method,
     subtotal,
     delivery_fee,
     service_fee,
     discount_amount,
     promo_code,
     tip,
     total,
     status,
     driver_name,
     driver_phone,
     eta_minutes
   )
    VALUES
    ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
     'placed', 'Marco Rossi', '+1 (555) 234-8910', 25) 
     RETURNING *
   `;

    const values = [
      orderId,
      customer_name.trim(),
      customer_phone.trim(),
      delivery_address.trim(),
      delivery_mode || "delivery",
      payment_method || "card",
      Number(subtotal) || 0.0,
      Number(delivery_fee) || 0.0,
      Number(service_fee) || 0.0,
      Number(discount_amount) || 0.0,
      promo_code || null,
      Number(tip) || 0.0,
      Number(total),
    ];
    const orderResult = await pool.query(query, values);

    for (const item of items) {
      const itemQuery = `
      INSERT INTO order_items(
       order_id,
          dish_id,
          dish_name,
          price,
          quantity,
          image
      )
          VALUES ($1, $2, $3, $4, $5, $6)
      `;

      await client.query(itemQuery, [
        orderId,
        item.id || null,
        item.name,
        Number(item.price),
        Number(item.quantity) || 1,
        item.image || "",
      ]);
    }

    await client.query("COMMIT");

    return res.status(201).json({
      order: orderResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
});

export default router;
