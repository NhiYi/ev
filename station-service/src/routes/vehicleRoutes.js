import express from "express";
import { VehicleController } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", VehicleController.list); // optional query ?stationId=1
router.get("/:id", VehicleController.detail);
router.post("/", VehicleController.create);
router.put("/:id", VehicleController.update);
router.delete("/:id", VehicleController.remove);

// status update separate
router.put("/:id/status", VehicleController.updateStatus);

export default router;
