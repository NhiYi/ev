import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import stationRoutes from "./routes/stationRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import { seedData } from "./seed/seedData.js"; // if you have

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/stations", stationRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/vehicles", transferRoutes); // POST /vehicles/transfer

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Station Service running on port ${PORT}`);
  if (typeof seedData === "function") seedData();
});
