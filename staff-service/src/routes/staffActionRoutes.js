import express from "express";
import {
  addAction,
  getActionsByStaff,
} from "../controllers/staffActionController.js";

const router = express.Router();

router.post("/", addAction);
router.get("/:staffId", getActionsByStaff);

export default router;
