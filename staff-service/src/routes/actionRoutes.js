import express from "express";
import { logAction } from "../controllers/actionController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, logAction);

export default router;
