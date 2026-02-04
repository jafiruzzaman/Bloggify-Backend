/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response, NextFunction } from 'express';

export const admin = (req: Request, res: Response, next: NextFunction) => {
	const userId = (req as any).user.id;

	if (!userId) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized',
		});
	}

	if ((req as any).user.role !== 'admin') {
		return res.status(403).json({
			success: false,
			message: 'Access Denied',
		});
	}

	next(); // ✅ VERY IMPORTANT
};
