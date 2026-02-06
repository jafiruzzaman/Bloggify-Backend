/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Schema, model, Model, Types } from 'mongoose';

/*============================================== Custom Modules ============================================== */
import type { IComment } from '@interface/comment.interface.js';

const commentSchema: Schema<IComment> = new Schema<IComment>(
	{
		author: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		blog: {
			type: Types.ObjectId,
			ref: 'Blog',
			required: true,
		},
		content: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

/*============================================== Export ============================================== */
export const CommentModel: Model<IComment> = model('Comment', commentSchema);
