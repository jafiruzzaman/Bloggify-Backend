/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { AnyZodObject } from 'zod/v3';
import type { Request, Response, NextFunction } from 'express';

export const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				params: req.params,
				query: req.params,
			});
			next();
		} catch (error: any) {
			return res.status(400).json({
				success: false,
				message: 'Validation Failed',
				errors: error.errors,
			});
		}
	};
