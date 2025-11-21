import express from "express";
import { getAllStaff, getOneStaff } from "../controllers/staffController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllStaff);
router.get("/:id", verifyToken, getOneStaff);

export default router;
