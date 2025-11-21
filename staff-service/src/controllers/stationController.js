import { Staff } from "../models/Staff.js";

export const getAllStaff = async (req, res) => {
  res.json(await Staff.findAll());
};

export const getOneStaff = async (req, res) => {
  res.json(await Staff.findById(req.params.id));
};
