/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

import type { ZodType } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				params: req.params,
				query: req.query,
			});
			next();
		} catch (error: any) {
			error = JSON.parse(error.message)[0];
			const formattedError = error.path[1] + ' ' + error.message;
			return res.status(400).json({
				success: false,
				message: 'Validation Failed',
				error: formattedError,
			});
		}
	};
};
