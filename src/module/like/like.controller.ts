/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { type Request, type Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { AppError } from '@utils/appError.ts';

/*============================================== Like Controller ============================================== */

export class LikeController {
	static async LikeBlog(req: Request, res: Response) {
		const { blog_id: blog_Id } = req.params;
		const authUser = (req as any).user;

		try {
			return res.status(201).json({
				success: true,
				message: 'Blog liked successfully',
			});
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					success: false,
					message: error.message,
				});
			} else {
				return res.status(500).json({
					success: false,
					message: 'Internal Server Error',
				});
			}
		}
	}
	static async DislikeBlog(req: Request, res: Response) {
		const { blog_id: blog_Id } = req.params;
		const authUser = (req as any).user;
		try {
			return res.status(204).send();
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					success: false,
					message: error.message,
				});
			} else {
				return res.status(500).json({
					success: false,
					message: 'Internal Server Error',
				});
			}
		}
	}
}
