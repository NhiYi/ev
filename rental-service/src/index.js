import express from "express";
import cors from "cors";
import rentalRoutes from "./routes/rentalRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/rentals", rentalRoutes);

const PORT = 5004;
app.listen(PORT, () => console.log(`Rental Service running on port ${PORT}`));
