/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Schema, Types, model } from 'mongoose';

/*============================================== Custom Modules ============================================== */
import type { IUser } from '@interface/user.interface';

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			minlength: [3, 'Name must be at least 3 characters'],
			maxlength: [50, 'Name cannot be more than 50 characters'],
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [8, 'Password must be at least 8 characters'],
			maxlength: [50, 'Password cannot be more than 50 characters'],
			trim: true,
		},
		bio: {
			type: String,
			trim: true,
			default: null,
		},
		profileImage: {
			type: String,
			trim: true,
			default: '',
		},
		blogs: [{ type: Types.ObjectId, ref: 'Blog' }],
		comments: [{ type: Types.ObjectId, ref: 'Comment' }],
		likes: [{ type: Types.ObjectId, ref: 'Like' }],
		refreshToken: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);
