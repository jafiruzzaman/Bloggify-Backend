/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

/*============================================== Custom Modules ============================================== */
import { BlogModel } from '@module/blog/blog.model.ts';
import { CommentModel } from './comment.model.ts';
import { UserModel } from '@module/user/user.model.ts';
import type { IComment } from '@interface/comment.interface.ts';
import { AppError } from '@utils/appError.ts';

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
	static async GetComment(id: string): Promise<IComment | undefined> {
		const result = await CommentModel.findById(id);
		if (!result) {
			return;
		}
		return result;
	}

	static async UpdateComment(commentId:string,authorId:string,content:string):Promise<IComment | undefined> {
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
}
