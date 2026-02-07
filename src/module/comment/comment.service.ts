/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

/*============================================== Custom Modules ============================================== */
import { BlogModel } from '@module/blog/blog.model.js';
import { CommentModel } from './comment.model.js';
import { UserModel } from '@module/user/user.model.js';
import type { IComment } from '@interface/comment.interface.js';
import { AppError } from '@utils/appError.js';

/*============================================== Comment Services ============================================== */
interface payload {
	author: string;
	blog: string;
	content?: string;
}
export class CommentServices {
	static async PostComment(payload: payload) {
		const comment = await CommentModel.create(payload);
		await BlogModel.findByIdAndUpdate(
			payload.blog,
			{
				$inc: {
					commentsCount: 1,
				},
			},
			{
				new: true,
			}
		);
		await UserModel.findByIdAndUpdate(payload.author, {
			$push: {
				comments: comment._id,
			},
		});
		return comment;
	}
	static async GetCommentByBlog(payload: payload) {
		const data = CommentModel.find({
			author: payload.author,
			blog: payload.blog,
		});
		if (!data) {
			return;
		}
		return data;
	}
	static async GetComment(id: string): Promise<IComment | null> {
		const result: IComment | null = await CommentModel.findById(id);
		return result;
	}

	static async UpdateComment(
		commentId: string,
		authorId: string,
		content: string
	): Promise<IComment | undefined> {
		const comment = await CommentModel.findById(commentId);

		if (!comment) {
			throw new AppError('Comment not found', 404);
		}

		// Ownership check
		if (comment.author.toString() !== authorId) {
			throw new AppError('You are not allowed to update this comment', 403);
		}

		comment.content = content;
		return await comment.save();
	}

	static async DeleteComment(
		blog_id: string,
		commentId: string,
		author: string
	) {
		const response = await CommentModel.findById(commentId);
		if (!response) {
			throw new AppError('Resource Not Found', 404);
		}
		if (response.author.toString() !== author) {
			throw new AppError('Access Denied', 403);
		}
		await CommentModel.findByIdAndDelete(commentId);
		await UserModel.findByIdAndUpdate(author, {
			$pull: { comments: commentId },
		});
		await BlogModel.findByIdAndUpdate(
			blog_id,
			{
				$inc: {
					commentsCount: -1,
				},
			},
			{
				new: true,
			}
		);
	}
}
