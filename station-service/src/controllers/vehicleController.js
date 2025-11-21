import { VehicleModel } from "../models/vehicleModel.js";
import { VehicleTransferModel } from "../models/vehicleTransfer.js"; // used for reporting/transfer history

export const VehicleController = {
  async list(req, res) {
    try {
      if (req.query.stationId) {
        const rows = await VehicleModel.findByStation(req.query.stationId);
        return res.json(rows);
      }
      const rows = await VehicleModel.findAll();
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  async detail(req, res) {
    try {
      const v = await VehicleModel.findById(req.params.id);
      if (!v) return res.status(404).json({ error: "Not found" });
      res.json(v);
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  async create(req, res) {
    try {
      const v = await VehicleModel.create(req.body);
      res.status(201).json(v);
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  async update(req, res) {
    try {
      await VehicleModel.update(req.params.id, req.body);
      res.json({ message: "Updated" });
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  async remove(req, res) {
    try {
      await VehicleModel.remove(req.params.id);
      res.json({ message: "Deleted" });
    } catch (e) { res.status(500).json({ error: e.message }); }
  },

  // update only status
  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      if (!status) return res.status(400).json({ error: "status required" });
      await VehicleModel.update(req.params.id, { status });
      res.json({ message: "Status updated" });
    } catch (e) { res.status(500).json({ error: e.message }); }
  }
};
