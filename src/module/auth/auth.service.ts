/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import bcrypt from 'bcrypt';

/*============================================== Custom Modules ============================================== */
import type { SignInPayload } from '@interface/auth.interface';
import type { IUser } from '@interface/user.interface';
import { UserModel } from '@module/user/user.model';
import { AppError } from '@utils/appError';

export class AuthService {
	static async signUp(payload: SignInPayload): Promise<IUser> {
		const existingUser = await UserModel.findOne({ email: payload.email });
		if (existingUser) {
			throw new AppError('User Already Exist', 409);
		}

		const hashedPassword = await bcrypt.hash(payload.password, 10);

		const user = await UserModel.create({
			...payload,
			password: hashedPassword,
		});

		// Remove password in a type-safe way
		const { password, ...userWithoutPassword } = user.toObject() as any;
		return userWithoutPassword;
	}
	static async signIn(payload: SignInPayload): Promise<IUser> {
		const userInDB: IUser | null = await UserModel.findOne({
			email: payload.email,
		});

		if (!userInDB) {
			throw new AppError('user Not Found', 404);
		}
		const comparePassword: boolean = await bcrypt.compare(
			payload.password,
			userInDB.password
		);
		if (!comparePassword) {
			throw new AppError('Invalid User Credentials', 400);
		}
		const { password, ...userObj } = userInDB.toObject();
		return userObj;
	}

	static async getMe(userId: string) {
		if (!userId) {
			throw new AppError('Unauthorized', 401);
		}

		const user = await UserModel.findById(userId);
		if (!user) {
			throw new AppError('No User Found', 404);
		}

		return user; // return the plain user object
	}
}
