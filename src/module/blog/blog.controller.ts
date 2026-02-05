/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response } from 'express';

/*============================================== Node Modules ============================================== */
import { AppError } from '@utils/appError.ts';
import { BlogService } from './blog.service.ts';
import slug from 'slug';

export class BlogController {
	static async createBlog(req: Request, res: Response) {
		const authUser = (req as any).user;
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
			const generateSlug:string = slug(title);
			const userId:any = (authUser.id).toString()
			const payload = { title, content, status, category, tags, slug:generateSlug,author:userId };

			const result = await BlogService.CreateBlog(payload);

			return res.status(201).json({
				success: true,
				message: 'Blog created Successfully!',
				data: result,
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
