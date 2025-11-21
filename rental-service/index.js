import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rentalRoutes from "./routes/rentalRoutes.js";
import { seedData } from "./seed/seedData.js";
import fs from "fs";
dotenv.config();

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads/rentals";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

app.use("/api/rentals", rentalRoutes);

app.get("/health", (req, res) => res.json({ status: "rental-service OK" }));

const port = process.env.PORT || 5004;
app.listen(port, () => {
  console.log(`Rental Service running on port ${port}`);
  seedData();
});
