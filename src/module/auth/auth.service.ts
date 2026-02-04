/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

import type { SignInPayload } from '@interface/auth.interface';
import type { IUser } from '@interface/user.interface';
import { UserModel } from '@module/user/user.model';
import { AppError } from '@utils/appError';
import bcrypt from 'bcrypt';

/*============================================== Node Modules ============================================== */

export class AuthService {
	static async signUp(payload: SignInPayload): Promise<IUser> {
		// Check if User exist or not
		const existingUser = await UserModel.findOne({ email: payload.email });
		if (existingUser) {
			throw new AppError('User Already Exist', 409);
		}
		const hashedPassword = await bcrypt.hash(payload.password, 10);

		const user = await UserModel.create({
			...payload,
			password: hashedPassword,
		});
		return user;
	}
}
