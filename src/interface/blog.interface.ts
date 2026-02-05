/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Document, Types } from 'mongoose';
/*============================================== Export IBlog ============================================== */

export interface IBlog extends Document {
	id: Types.ObjectId;
	title: string;
	slug: string;
	coverImage: string;
	content: string;
	tags: [string];
	author: Types.ObjectId;
	likesCount: number;
	commentsCount: number;
	status: 'published' | 'draft';
	createdAt: Date;
	updatedAt: Date;
}
