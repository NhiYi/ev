import axios from "axios";
import { Vehicle } from "../models/Vehicle.js";

export const VehicleController = {
  async list(req, res) {
    res.json(await Vehicle.findAll());
  },

  async create(req, res) {
    res.json(await Vehicle.create(req.body));
  },

  async updateStatus(req, res) {
    await Vehicle.updateStatus(req.params.id, req.body.status);

    // push analytics
    await axios.post("http://localhost:4004/analytics/event", {
      type: "vehicle.status",
      payload: {
        vehicleId: req.params.id,
        status: req.body.status
      }
    });

    res.json({ message: "Status updated" });
  },

  async transfer(req, res) {
    const { vehicleId, fromStation, toStation, staffId } = req.body;

    await Vehicle.transfer(vehicleId, fromStation, toStation, staffId);

    // push analytics
    await axios.post("http://localhost:4004/analytics/event", {
      type: "vehicle.transfer",
      payload: {
        vehicleId,
        fromStation,
        toStation,
        staffId
      }
    });

    res.json({ message: "Vehicle transferred" });
  }
};
