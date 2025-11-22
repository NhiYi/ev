import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";
import "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/payments", paymentRoutes);

app.listen(5005, () => console.log("Payment Service running on port 5005"));
