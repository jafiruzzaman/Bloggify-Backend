/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import express from 'express';
import type { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from '@config/rateLimit.config';
import { env } from '@config/env.config';

/*============================================== Custom Modules ============================================== */
const app: Express = express();

/*============================================== Trust Proxy (IMPORTANT) ============================================== */
/**
 * Required when app runs behind:
 * - Nginx
 * - Vercel
 * - Railway
 * - Docker
 */
app.set('trust proxy', 1);

/*============================================== CORS Configuration ============================================== */
const corsOptions: CorsOptions = {
	allowedHeaders: ['Authorization', 'Content-Type'],
	methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
	origin: env.frontendDomain,
	credentials: true,
};
app.use(cors(corsOptions));

/*============================================== Express JSON configuration ============================================== */
app.use(
	express.json({
		limit: '50mb',
		type: '',
	})
);

/*============================================== Express UrlEncoded configuration ============================================== */
app.use(
	express.urlencoded({
		limit: '50mb',
		extended: true,
	})
);

/*============================================== Express Static configuration ============================================== */
app.use(express.static('public'));

/*============================================== helmet configuration ============================================== */
app.use(
	helmet({
		contentSecurityPolicy: env.nodeEnv === 'production',
		crossOriginEmbedderPolicy: env.nodeEnv === 'production',
		referrerPolicy: {
			policy: 'strict-origin-when-cross-origin',
		},
		hsts:
			env.nodeEnv === 'production'
				? {
						maxAge: 31536000,
						includeSubDomains: true,
						preload: true,
					}
				: false,
	})
);
/*============================================== Morgan configuration ============================================== */

if (env.nodeEnv !== 'test') {
	app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
}

/*============================================== RateLimit  configuration ============================================== */
app.use(rateLimit);
/*============================================== Health Check ============================================== */
app.get('/health', (_req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		status: 'OK',
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
});

/*============================================== 404 Handler ============================================== */
app.use((_req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		message: 'Route not found',
	});
});

/*============================================== Export App ============================================== */
export { app };
