/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { AppError } from '@utils/appError';
import { UserService } from './user.service';

export class UserController {
	static async getUserById(req: Request, res: Response) {
		const userId = await (req as any).user.id;
		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}
		try {
			const response = await UserService.getUserById(userId);
			return res.status(200).json({
				success: true,
				message: 'Get User By Id',
				data: response,
			});
		} catch (error: any) {
			console.log(error);

			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					success: false,
					error: error.message,
				});
			}
			return res.status(500).json({
				success: false,
				error: error || 'Internal Server Error',
			});
		}
	}
}
