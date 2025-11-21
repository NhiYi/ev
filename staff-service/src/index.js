import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import actionRoutes from "./routes/actionRoutes.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/staff", staffRoutes);
app.use("/actions", actionRoutes);

app.listen(4002, () => {
  console.log("Staff Service running on port 4002");
});
