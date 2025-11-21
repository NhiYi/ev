import express from "express";
import { StationController } from "../controllers/stationController.js";

const router = express.Router();

router.get("/", StationController.list);
router.get("/:id", StationController.detail);
router.post("/", StationController.create);
router.put("/:id", StationController.update);
router.delete("/:id", StationController.remove);

export default router;
