/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response } from 'express';
/*============================================== Node Modules ============================================== */
import { AppError } from '@utils/appError.ts';
import { CommentServices } from './comment.service.ts';

/*============================================== Comment Controller ============================================== */

export class CommentController {
	static async PostComment(req: Request, res: Response) {
		const authUser = (req as any).user;
		const { blog_id: blogId } = req.params;
		const { content } = req.body;
		console.log(authUser.id, blogId, content);

		if (!authUser.id || !blogId || !content) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required',
			});
		}

		try {
			const data = await CommentServices.PostComment({
				author: authUser.id,
				blog: blogId.toString(),
				content: content.toString(),
			});
			return res.status(201).json({
				success: true,
				message: 'Comment Posted Successfully',
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

	static async GetCommentsByBlog(req: Request, res: Response) {
		const authUser = (req as any).user;
		const { blog_id: blogId } = req.params;
		console.log(` Blog id ${blogId}`);

		try {
			const response = await CommentServices.GetCommentByBlog({
				author: authUser.id,
				blog: blogId as string,
			});
			return res.status(200).json({
				success: true,
				message: 'Get Comments By Blog Successfully',
				data: response,
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

	static async GetComment(req: Request, res: Response) {
		const authUser = (req as any).user;
		const blogId = req.params;
		if (!authUser.id || !blogId) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required',
			});
		}
		try {
			// const response =
			return res.status(200).json({
				success: true,
				message: 'Get Comment Successfully',
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

	static async UpdateComment(req: Request, res: Response) {
		const authUser = (req as any).user;
		const blogId = req.params;
		const { content } = req.body;
		if (!authUser.id || !blogId || !content) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required',
			});
		}
		try {
			// const response =
			return res.status(200).json({
				success: true,
				message: 'Update Comment Successfully',
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

	static async DeleteComment(req: Request, res: Response) {
		const authUser = (req as any).user;
		const blogId = req.params;

		try {
			// const response =
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
