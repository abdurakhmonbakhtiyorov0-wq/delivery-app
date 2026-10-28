import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import addresessRoutes from "./routes/addresess.js";
import authRoutes from "./routes/auth.js";
import restRoutes from "./routes/restaurants.js";
import dishesRoutes from "./routes/dishes.js";
import ordersRoutes from "./routes/orders.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/address", addresessRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restRoutes);
app.use("/api/dishes", dishesRoutes);
app.use("/api/orders", ordersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server runing on port 5000");
});
