import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { seedData } from "./seed/seedData.js";
import stationRoutes from "./routes/stationRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/stations", stationRoutes);
app.use("/vehicles", vehicleRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Station Service running on port ${process.env.PORT}`);

  // Seed only first time
  seedData();
});
