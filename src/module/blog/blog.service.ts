/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

/*============================================== Custom Modules ============================================== */
import type { IBlog } from '@interface/blog.interface.js';
import { BlogModel } from './blog.model.js';
import { UserModel } from '@module/user/user.model.js';
import { IBlogQuery } from '@interface/blogquery.interface.js';

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
		await UserModel.findByIdAndUpdate(payload.author, {
			$push: {
				blogs: result._id,
			},
		});
		return result;
	}
	static async GetAllBlogs(query: IBlogQuery): Promise<IBlog[]> {
		const {
			authors,
			tags,
			limit = 10,
			page = 1,
			sort = '-createdAt',
		} = query as IBlogQuery;
		const filter: any = {};
		if (authors) {
			filter.author = { $in: authors.split(',') };
		}
		if (tags) {
			filter.tags = {
				$in: tags.split(','),
			};
		}
		// pagination
		const skip = (page - 1) * limit;

		return await BlogModel.find(filter).sort(sort).skip(skip).limit(limit);
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

	static async deleteBlog(blogId: string, authId: string) {
		// 1️⃣ Find blog first
		const blog = await BlogModel.findById(blogId);

		if (!blog) {
			throw new Error('Blog not found');
		}

		// 2️⃣ Authorization check
		if (blog.author.toString() !== authId) {
			throw new Error('You are not allowed to delete this blog');
		}

		// 3️⃣ Remove blog reference from user
		await UserModel.findByIdAndUpdate(authId, {
			$pull: { blogs: blogId },
		});

		// 4️⃣ Delete blog
		await BlogModel.findByIdAndDelete(blogId);

		return null;
	}
}
