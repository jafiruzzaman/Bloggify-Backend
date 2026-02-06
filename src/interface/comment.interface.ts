/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Types } from 'mongoose';

/*============================================== Comment Interface ============================================== */
export interface IComment {
	_id: Types.ObjectId;
	author: Types.ObjectId;
	blog: Types.ObjectId;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}
