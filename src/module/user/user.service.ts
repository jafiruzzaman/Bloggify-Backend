/**
 * @copyright Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */

/*============================================== Custom Modules ============================================== */
import type { IUser } from '@interface/user.interface';
import { UserModel } from './user.model';

export class UserService {
	static async getUserById(
		id: string
	): Promise<Omit<IUser, 'password'> | null> {
		const user = await UserModel.findById(id).select('-password').lean<IUser>();
		return user;
	}
}
