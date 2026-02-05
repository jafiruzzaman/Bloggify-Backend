/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

/*============================================== Custom Modules ============================================== */
import type { IBlog } from '@interface/blog.interface.ts';
import { BlogModel } from './blog.model.ts';

/*============================================== Payload Interface ============================================== */
interface payload {
	title: string;
	content: string;
	category: string;
	tags: string[];
	status: string;
	author: string;
	slug: string;
}

export class BlogService {
	static async CreateBlog(payload: payload): Promise<IBlog> {
		const result = await BlogModel.create(payload);
		return result;
	}
	static async GetAllBlogs(): Promise<IBlog[]> {
		return await BlogModel.find();
	}
	static async GetBlogBySlug(slug: string): Promise<IBlog | null> {
		return await BlogModel.findOne({
			slug: slug,
		});
	}
	static async UpdateBlog(id: string, payload: any): Promise<IBlog | null> {
		const updateQuery: any = {};

		if (payload.title) updateQuery.title = payload.title;
		if (payload.content) updateQuery.content = payload.content;
		if (payload.status) updateQuery.status = payload.status;
		if (payload.category) updateQuery.category = payload.category;
		if (payload.tags) {
			updateQuery.tags = payload.tags;
		}

		return await BlogModel.findByIdAndUpdate(id, updateQuery, {
			new: true,
			runValidators: true,
		});
	}
}
