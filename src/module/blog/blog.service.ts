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
}
