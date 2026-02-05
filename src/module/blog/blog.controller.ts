/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response } from 'express';

/*============================================== Node Modules ============================================== */
import { AppError } from '@utils/appError.ts';

export class BlogController {
	static async creteBlog(req: Request, res: Response) {
		const authUser = await (req as any).user;
		if (!authUser) {
			return res.status(401).json({
				success: false,
				message: 'Invalid User Credentials',
			});
		}
		const { title, content, status, category, tags } = req.body;
		if (!title || !content || !status || !category || !tags) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required',
			});
		}
		try {
			return res.status(201).json({
				success: true,
				message: 'Blog created Successfully!',
			});
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(400).json({
					success: false,
					message: error.message,
				});
			}
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	}
}
