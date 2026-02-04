import type { Document, Types } from 'mongoose';

/*============================================== User Interface ============================================== */
export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	profileImage?: string;
	bio?: string;
	blogs?: Types.ObjectId[];
	comments?: Types.ObjectId[];
	likes?: Types.ObjectId[];
	refreshToken?: string;
	createdAt: Date;
	updatedAt: Date;
}
