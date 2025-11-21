import express from "express";
import { TransferController } from "../controllers/transferController.js";

const router = express.Router();

router.post("/transfer", TransferController.transfer);

export default router;
