import express from "express";
import {
  logEvent,
  revenueByStation,
  topVehicles,
  rentalHeatmap,
  staffPerformance
} from "../controllers/analyticsController";

const router = express.Router();

// Receive events from all services
router.post("/event", logEvent);

// Revenue by station
router.get("/revenue/station", revenueByStation);

// Most used vehicles
router.get("/vehicles/top", topVehicles);

// Rental time heatmap
router.get("/heatmap/rent-time", rentalHeatmap);

// Staff performance
router.get("/staff/performance", staffPerformance);

export default router;
