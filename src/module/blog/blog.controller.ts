/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response } from 'express';

/*============================================== Node Modules ============================================== */
import { AppError } from '@utils/appError.ts';
import { BlogService } from './blog.service.ts';
import slug from 'slug';
import type { IBlog } from '@interface/blog.interface.ts';

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

		// convert tags into tags array
		const tagsArray = typeof tags === "string" ? tags.split(",").map((t)=>t.replace(/"/g,"").trim()) : tags;


		try {
			const generateSlug: string = slug(title);
			const userId: any = authUser.id.toString();
			const payload = {
				title,
				content,
				status,
				category,
				tags:tagsArray,
				slug: generateSlug,
				author: userId,
			};

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

	static async GetAllBlogs(req: Request, res: Response) {
		try {
			const response: IBlog[] = await BlogService.GetAllBlogs();
			return res.status(200).json({
				success: true,
				message: 'Fetched All Blogs',
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

	static async GetBlogBySlug(req: Request, res: Response) {
		const slug = req.params.slug;
		if (!slug) {
			return res.status(400).json({
				success: false,
			});
		}
		try {
			const response = await BlogService.GetBlogBySlug(slug);
			return res.status(200).json({
				success: true,
				message: 'Fetched Blog By Slug',
				data: (response),
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
}
