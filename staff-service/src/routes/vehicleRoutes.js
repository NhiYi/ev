import express from "express";
import { VehicleController } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", VehicleController.list);
router.post("/", VehicleController.create);
router.put("/:id/status", VehicleController.updateStatus);
router.post("/transfer", VehicleController.transfer);

export default router;
