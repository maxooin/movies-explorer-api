import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Слишком много запросов с одного IP-адреса',
});

export default rateLimiter;
