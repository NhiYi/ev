import { VehicleModel } from "../models/vehicleModel.js";
import { VehicleTransferModel } from "../models/vehicleTransfer.js";
import axios from "axios";

const ANALYTICS_URL = process.env.ANALYTICS_SERVICE_URL || "http://localhost:5006";

export const TransferController = {
  async transfer(req, res) {
    try {
      const { vehicleId, toStation, staffId, note } = req.body;
      if (!vehicleId || !toStation) return res.status(400).json({ error: "vehicleId and toStation required" });

      const vehicle = await VehicleModel.findById(vehicleId);
      if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

      const fromStation = vehicle.stationId;

      // update vehicle station
      await VehicleModel.update(vehicleId, { stationId: toStation });

      // store transfer record
      const record = await VehicleTransferModel.create({ vehicleId, fromStation, toStation, staffId, note });

      // push quick analytics event (non-blocking)
      try {
        axios.post(`${ANALYTICS_URL}/analytics/event`, {
          type: "vehicle_transfer",
          vehicleId,
          fromStation,
          toStation,
          staffId,
          note,
          timestamp: new Date().toISOString()
        }).catch(()=>{/* non-fatal */});
      } catch(_) {}

      res.json({ message: "Vehicle transferred", record });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};
