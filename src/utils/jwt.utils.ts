/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { env } from '@config/env.config.ts';
import jwt from 'jsonwebtoken';
import type ms from 'ms';
export interface JWTPayload {
	id: string;
	role: string;
}
const generateAccessToken = (payload: JWTPayload): string => {
	return jwt.sign(payload, env.accessTokenSecret, {
		expiresIn: env.accessTokenExpiresIn as ms.StringValue,
	});
};

const generateRefreshToken = (payload: JWTPayload): string => {
	return jwt.sign(payload, env.refreshTokenSecret, {
		expiresIn: env.refreshTokenExpiresIn as ms.StringValue,
	});
};

export { generateAccessToken, generateRefreshToken };
