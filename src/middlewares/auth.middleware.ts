/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/*============================================== Custom Modules ============================================== */
import { env } from '../config/env.config.js';
import { AppError } from '../utils/appError.js';
import type { JWTPayload } from '../utils/jwt.utils.js';

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let token: string | undefined;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			throw new AppError('Unauthorized', 401);
		}

		// ✅ Type assertion to JWTPayload
		const decoded = jwt.verify(token, env.accessTokenSecret) as JWTPayload;

		// Attach user info to request
		(req as any).user = decoded;

		next();
	} catch (err: any) {
		return res.status(err.statusCode || 401).json({
			success: false,
			message: err.message || 'Unauthorized',
		});
	}
};
