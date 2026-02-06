/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import dotenv from 'dotenv';
dotenv.config();
/*============================================== Custom Modules ============================================== */
import type { IEnv } from '@interface/env.interface.js';

const config: IEnv = {
	port: Number(process.env.PORT),
	apiVersion: process.env.API_VERSION as string,
	nodeEnv: process.env.NODE_ENV as string,

	mongodbUri: process.env.MONGODB_URI as string,
	dbName: process.env.DB_NAME as string,

	frontendDomain: process.env.FRONTEND_DOMAIN as string,

	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
	accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,

	refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
	refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,

	cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
	cloudinaryApiKey: process.env.CLOUDINARY_API_KEY as string,
	cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET as string,

	rateLimitMax: Number(process.env.RATE_LIMIT_MAX),
	rateLimitWindowMS: Number(process.env.RATE_LIMIT_MAX),

	maxFileSize: Number(process.env.MAX_FILE_SIZE),
	logLevel: process.env.LOG_LEVEL as string,
};

/*============================================== Export Env ============================================== */
export const env = Object.freeze(config);
