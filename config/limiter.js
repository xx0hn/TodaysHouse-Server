const limiter = require('express-rate-limit');

exports.apiLimiter = limiter({
  windowMs: 6000,
  max: 5,
  delayMs: 0,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: 'You can only make 5 requests per minute.',
    });
  },
});
