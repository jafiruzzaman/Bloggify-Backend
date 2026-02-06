/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { rateLimit as rateLimiter } from 'express-rate-limit';
/*============================================== Custom Modules ============================================== */
import { env } from './env.config.js';

const rateLimit = rateLimiter({
	limit: env.rateLimitMax,
	windowMs: env.rateLimitWindowMS,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		statusCode: 429,
		error: 'Too many request.Please try again letter',
	},
	handler: (req, res, next, option) => {
		res.status(option.statusCode).json(option.message);
	},
});

/*============================================== Export RateLimit ============================================== */
export { rateLimit };
