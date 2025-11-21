import express from "express";
import { StationController } from "../controllers/stationController.js";

const router = express.Router();

router.get("/", StationController.getAll);
router.post("/", StationController.create);
router.put("/:id", StationController.update);
router.delete("/:id", StationController.delete);

export default router;
