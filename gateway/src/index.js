import express from "express";
import dotenv from "dotenv";
import { router } from "./routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", router);

app.listen(8080, () =>
  console.log("API Gateway running on port 8080")
);
