import { Types } from 'mongoose';
/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

/*============================================== Custom Modules ============================================== */
import { UserModel } from '@module/user/user.model.ts';
import { LikeModel, type ILike } from './like.model.ts';
import { BlogModel } from '@module/blog/blog.model.ts';

/*============================================== Like Services ============================================== */
export class LikeService {
	static async Like(authId: string, blogId: string) {
		try {
			// Increment the blog's likesCount
			const blog = await BlogModel.findByIdAndUpdate(
				blogId,
				{ $inc: { likesCount: 1 } }, // just $inc, no $push
				{ new: true }
			);
			if (!blog) {
				throw new Error('Blog Not Found');
			}
			// Create the like
			const result: ILike = await LikeModel.create({
				author: authId,
				blog: blogId,
			});
			// Update the user to include this like
			await UserModel.findByIdAndUpdate(authId, {
				$push: { likes: result._id },
			});
			return result; // return the created like if needed
		} catch (err) {
			console.error('Error liking blog:', err);
			throw err;
		}
	}
}
