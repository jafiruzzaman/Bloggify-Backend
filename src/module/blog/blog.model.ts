/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { IBlog } from '@interface/blog.interface.ts';
import { Model, model, Schema, Types } from 'mongoose';

const blogSchema = new Schema<IBlog>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: [3, 'Title must be at-least 3 characters'],
		},
		slug: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		coverImage: {
			type: String,
			trim: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
		},
		tags: {
			type: [String],
			default: [],
		},
		likesCount: {
			type: Number,
			default: 0,
		},
		commentsCount: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			enum: ['published', 'draft'],
			default: 'published',
		},
	},
	{ timestamps: true }
);

blogSchema.index({ slug: 1 });

export const BlogModel: Model<IBlog> = model<IBlog>('Blog', blogSchema);
