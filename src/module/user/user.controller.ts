/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { AppError } from '@utils/appError.ts';
import { UserService } from './user.service.ts';

export class UserController {
	static async getAllUsers(req: Request, res: Response) {
		try {
			const result = await UserService.getAllUsers();

			if (!result) {
				return res.status(404).json({
					success: false,
					message: 'No Resource Found',
				});
			}

			return res.status(200).json({
				success: true,
				message: 'Fetch all user data',
				data: result,
			});
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					success: false,
					error: error.message,
				});
			}
			return res.status(500).json({
				success: false,
				error: error || 'Internal Server Error',
			});
		}
	}
	static async getUserById(req: Request, res: Response) {
		const userId = await (req as any).user.id;
		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}
		try {
			const response = await UserService.getUserById(userId);
			return res.status(200).json({
				success: true,
				message: 'Get User By Id',
				data: response,
			});
		} catch (error: any) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					success: false,
					error: error.message,
				});
			}
			return res.status(500).json({
				success: false,
				error: error || 'Internal Server Error',
			});
		}
	}
	static async updateUser(req: Request, res: Response) {
		try {
			const authUser = (req as any).user; // Authenticated user from middleware
			const targetUserId = req.params.id as string; // The ID of the user to update

			// 🔐 Authorization check
			if (authUser.role !== 'admin' && authUser.id !== targetUserId) {
				return res.status(403).json({
					success: false,
					message: 'You are not allowed to update this account',
				});
			}

			// Optional: prevent users from updating sensitive fields like role or password
			if (authUser.role !== 'admin') {
				delete req.body.role; // normal users cannot change role
				delete req.body.password; // normal users cannot change password here
			}

			const updatedUser = await UserService.updateUserById(
				targetUserId,
				req.body
			);

			return res.status(200).json({
				success: true,
				message: 'User updated successfully',
				data: updatedUser,
			});
		} catch (err) {
			console.error(err);
			return res.status(500).json({
				success: false,
				message: 'Server error',
			});
		}
	}
	static async deleteUser(req: Request, res: Response) {
		try {
			const authUser = (req as any).user;
			const targetUserId = req.params.id as string;

			// Authorization check
			if (authUser.role !== 'admin' && authUser.id !== targetUserId) {
				return res.status(403).json({
					success: false,
					message: 'You are not allowed to delete this account',
				});
			}

			const deletedUser = await UserService.deleteUserById(targetUserId);

			if (!deletedUser) {
				return res.status(404).json({
					success: false,
					message: 'User not found',
				});
			}

			return res.status(204).json({
				success: true,
				message: 'User deleted successfully',
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	}
}
