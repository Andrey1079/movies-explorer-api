const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({ windowMs: 900000, max: 200 });

module.exports = limiter;
