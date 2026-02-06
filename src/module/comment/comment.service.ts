/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

/*============================================== Custom Modules ============================================== */
import { BlogModel } from '@module/blog/blog.model.ts';
import { CommentModel } from './comment.model.ts';
import { UserModel } from '@module/user/user.model.ts';

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
		const data = CommentModel.findOne({
			author: payload.author,
			blog: payload.blog,
		});
		if (!data) {
			return;
		}
		return data;
	}
}
