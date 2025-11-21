import { StationModel } from "../models/stationModel.js";

export const StationController = {
  async list(req, res) {
    try { const data = await StationModel.findAll(); res.json(data); } catch (e) { res.status(500).json({ error: e.message }); }
  },
  async detail(req, res) {
    try { const s = await StationModel.findById(req.params.id); if (!s) return res.status(404).json({ error: "Not found" }); res.json(s); } catch (e) { res.status(500).json({ error: e.message }); }
  },
  async create(req, res) {
    try { const s = await StationModel.create(req.body); res.status(201).json(s); } catch (e) { res.status(500).json({ error: e.message }); }
  },
  async update(req, res) {
    try { await StationModel.update(req.params.id, req.body); res.json({ message: "Updated" }); } catch (e) { res.status(500).json({ error: e.message }); }
  },
  async remove(req, res) {
    try { await StationModel.remove(req.params.id); res.json({ message: "Deleted" }); } catch (e) { res.status(500).json({ error: e.message }); }
  }
};
