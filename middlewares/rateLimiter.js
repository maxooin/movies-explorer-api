import rateLimit from 'express-rate-limit';
import { errorMessageRouters } from '../utils/constants.js';

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorMessageRouters.tooMany,
});

export default rateLimiter;
