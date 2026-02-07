import { Types } from 'mongoose';
/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

/*============================================== Custom Modules ============================================== */
import { UserModel } from '@module/user/user.model.js';
import { LikeModel, type ILike } from './like.model.js';
import { BlogModel } from '@module/blog/blog.model.js';
import { AppError } from '@utils/appError.js';

/*============================================== Like Services ============================================== */
export class LikeService {
	static async Like(authId: string, blogId: string): Promise<ILike> {
		try {
			const existing = await LikeModel.findOne({
				author: authId,
				blog: blogId,
			});
			if (existing) throw new AppError('You already liked this blog', 400);
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
	static async Dislike(authId: string, blogId: string): Promise<void> {
		try {
			// Find and delete the like
			const dislike = await LikeModel.findOneAndDelete({
				author: authId,
				blog: blogId,
			});

			if (!dislike) return; // no like found, nothing to do

			// Decrement likesCount in Blog model
			await BlogModel.findByIdAndUpdate(
				blogId,
				{ $inc: { likesCount: -1 } }, // decrement
				{ new: true }
			);

			// Remove the like from user's likes array
			await UserModel.findByIdAndUpdate(authId, {
				$pull: { likes: dislike._id },
			});
		} catch (error) {
			console.error('Error disliking blog:', error);
			throw error;
		}
	}
}
