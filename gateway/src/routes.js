import express from "express";
import { forward } from "./utils/proxy.js";
import { auth } from "./middlewares/auth.js";
import { apiKey } from "./middlewares/apiKey.js";
import { rateLimit } from "./middlewares/rateLimit.js";

export const router = express.Router();

const services = {
  staff: "http://localhost:4002",
  station: "http://localhost:4001",
  rental: "http://localhost:4003",
  analytics: "http://localhost:4004",
};

// ✔ Route chung cho cả 4 service
["staff", "station", "rental", "analytics"].forEach((svc) => {
  router.use(`/${svc}`, apiKey, rateLimit, auth, (req, res) =>
    forward(req, res, services[svc])
  );
});
