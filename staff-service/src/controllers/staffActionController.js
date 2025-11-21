import { StaffAction } from "../models/StaffAction.js";
import axios from "axios";

export const addAction = async (req, res) => {
  try {
    const { staffId, action, details } = req.body;

    const log = await StaffAction.create({ staffId, action, details });

    // Push sang analytics
    axios.post("http://localhost:5007/analytics/event", {
      type: "staff_action",
      staffId,
      action,
      details,
      timestamp: Date.now(),
    }).catch(() => {});

    res.json(log);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getActionsByStaff = async (req, res) => {
  try {
    const data = await StaffAction.findByStaff(req.params.staffId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
