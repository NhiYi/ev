import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import axios from "axios";

dotenv.config();

const PORT = process.env.PORT || 8000;

// Targets (upstreams)
const RENTAL_URL = process.env.RENTAL_URL || "http://localhost:4001";
const STATION_URL = process.env.STATION_URL || "http://localhost:4002";
const PAYMENT_URL = process.env.PAYMENT_URL || "http://localhost:4003";
const ANALYTICS_URL = process.env.ANALYTICS_URL || "http://localhost:4004";

// API keys (simple in-memory list)
const API_KEYS = new Map([
  [process.env.FE_API_KEY || "FE123456789", { consumer: "frontend-app", role: "frontend" }],
  [process.env.ADMIN_API_KEY || "ADMIN123456789", { consumer: "admin", role: "admin" }]
]);

// Rate limit config
const WINDOW_MINUTES = parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || "1", 10);
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX || "120", 10);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Global rate limiter (by IP)
const globalLimiter = rateLimit({
  windowMs: WINDOW_MINUTES * 60 * 1000,
  max: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests, please try later." });
  }
});
app.use(globalLimiter);

// Per-key rate limiter factory (simple)
const perKeyLimiters = new Map();
function getPerKeyLimiter(key) {
  if (perKeyLimiters.has(key)) return perKeyLimiters.get(key);
  const limiter = rateLimit({
    windowMs: WINDOW_MINUTES * 60 * 1000,
    max: MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false
  });
  perKeyLimiters.set(key, limiter);
  return limiter;
}

// Simple API Key middleware
function apiKeyAuth(req, res, next) {
  // allow health route without key
  if (req.path === "/health" || req.path === "/") return next();

  const headerKey = (req.header("x-api-key") || req.header("apikey") || "").trim();
  const queryKey = (req.query.apiKey || "").trim();
  const key = headerKey || queryKey;

  if (!key) {
    return res.status(401).json({ error: "Missing API key (x-api-key or ?apiKey)" });
  }

  const consumer = API_KEYS.get(key);
  if (!consumer) return res.status(403).json({ error: "Invalid API key" });

  // attach consumer info
  req.consumer = consumer;
  req.apiKey = key;

  // apply per-key rate limiter (optional)
  const limiter = getPerKeyLimiter(key);
  return limiter(req, res, next);
}

app.use(apiKeyAuth);

// helper: forward analytics events to analytics service (gateway-level)
app.post("/internal/analytics/forward", async (req, res) => {
  try {
    const { type, payload } = req.body;
    await axios.post(`${ANALYTICS_URL}/analytics/event`, { type, payload }).catch(()=>{});
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health and info
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    services: { rental: RENTAL_URL, station: STATION_URL, payment: PAYMENT_URL, analytics: ANALYTICS_URL }
  });
});

// Proxy options helper
function proxyOptions(targetUrl, opts = {}) {
  return {
    target: targetUrl,
    changeOrigin: true,
    proxyTimeout: 10000,
    timeout: 20000,
    pathRewrite: opts.pathRewrite || undefined,
    onProxyReq(proxyReq, req, res) {
      // forward consumer info as header
      if (req.consumer) {
        proxyReq.setHeader("x-consumer", req.consumer.consumer || "");
        proxyReq.setHeader("x-consumer-role", req.consumer.role || "");
        proxyReq.setHeader("x-api-key", req.apiKey || "");
      }
    },
    onError(err, req, res) {
      res.status(502).json({ error: "Bad gateway", details: err?.message });
    }
  };
}

/**
 * Routes mapping (behaves like Kong routes)
 *
 * Public routes (prefix)
 *  - /api/rental  -> RENTAL_URL
 *  - /api/station -> STATION_URL
 *  - /api/payment -> PAYMENT_URL
 *  - /api/analytics -> ANALYTICS_URL (protected too)
 */

// Rental
app.use("/api/rental", createProxyMiddleware(proxyOptions(RENTAL_URL, {
  pathRewrite: { "^/api/rental": "/" }
})));

// Station
app.use("/api/station", createProxyMiddleware(proxyOptions(STATION_URL, {
  pathRewrite: { "^/api/station": "/" }
})));

// Payment
app.use("/api/payment", createProxyMiddleware(proxyOptions(PAYMENT_URL, {
  pathRewrite: { "^/api/payment": "/" }
})));

// Analytics (protected)
app.use("/api/analytics", createProxyMiddleware(proxyOptions(ANALYTICS_URL, {
  pathRewrite: { "^/api/analytics": "/" }
})));

// Optional: passthrough for uploads/static if needed
app.use("/uploads", createProxyMiddleware(proxyOptions(RENTAL_URL, { pathRewrite: { "^/uploads": "/uploads" } })));

// Default fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found on gateway" });
});

// Start
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`rental -> ${RENTAL_URL}`);
  console.log(`station -> ${STATION_URL}`);
  console.log(`payment -> ${PAYMENT_URL}`);
  console.log(`analytics -> ${ANALYTICS_URL}`);
});
