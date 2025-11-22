import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 10,       // 10 requests
  duration: 1       // per second
});

export const rateLimit = (req, res, next) => {
  limiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ error: "Too Many Requests" }));
};
