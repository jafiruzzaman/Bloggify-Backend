/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Schema, model, Model, Types } from 'mongoose';

/*============================================== Like Interface ============================================== */
interface ILike {
	_id: Types.ObjectId;
	author: Types.ObjectId;
	blog: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}
/*============================================== Like Schema ============================================== */
const likeSchema = new Schema<ILike>(
	{
		author: {
			type: Types.ObjectId,
			required: true,
			ref: 'User',
		},
		blog: {
			type: Types.ObjectId,
			required: true,
			ref: 'Blog',
		},
	},
	{
		timestamps: true,
	}
);

/*============================================== Like ============================================== */
likeSchema.index({ author: 1, blog: 1 }, { unique: true });

/*============================================== Like Model ============================================== */
export const LikeModel: Model<ILike> = model<ILike>('Like', likeSchema);
