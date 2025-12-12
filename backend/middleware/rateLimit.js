let requestCounts = {};
const WINDOW_SIZE = 60 * 1000; // 1 menit
const MAX_REQUESTS = 20;

module.exports = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  if (!requestCounts[ip]) requestCounts[ip] = [];
  requestCounts[ip] = requestCounts[ip].filter(ts => now - ts < WINDOW_SIZE);
  if (requestCounts[ip].length >= MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }
  requestCounts[ip].push(now);
  next();
};
