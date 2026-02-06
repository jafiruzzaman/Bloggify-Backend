/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { type Request, type Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { AppError } from '@utils/appError.js';
import type { ILike } from './like.model.js';
import { LikeService } from './like.service.js';
import { BlogModel } from '@module/blog/blog.model.js';

/*============================================== Like Controller ============================================== */

export class LikeController {
	static async LikeBlog(req: Request, res: Response) {
		const { blog_id: blog_Id } = req.params;
		const authUser = (req as any).user;
		const blog = await BlogModel.findById(blog_Id);
		if (!blog) {
			return res.status(404).json({
				success: false,
				Message: 'No Blog Found',
			});
		}
		try {
			const data: ILike = await LikeService.Like(
				authUser.id.toString(),
				blog_Id as string
			);
			return res.status(201).json({
				success: true,
				message: 'Blog liked successfully',
				data,
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
		const blog = await BlogModel.findById(blog_Id);
		if (!blog) {
			return res.status(404).json({
				success: false,
				Message: 'No Blog Found',
			});
		}
		try {
			await LikeService.Dislike(authUser.id.toString(), blog_Id as string);
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
