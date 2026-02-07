/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { AuthService } from './auth.service.js';
import { AppError } from '@utils/appError.js';
import { generateAccessToken, generateRefreshToken } from '@utils/jwt.utils.js';
import { UserModel } from '@module/user/user.model.js';
import { env } from '@config/env.config.js';

export class AuthController {
	static async signUp(req: Request, res: Response) {
		const { name, email, password, role } = req.body;

		// Basic check for missing fields
		if (!name || !email || !password || !role) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required',
			});
		}

		try {
			const result = await AuthService.signUp(req.body);

			return res.status(201).json({
				success: true,
				message: 'User Signup successfully',
				data: result,
			});
		} catch (err: any) {
			// Handle AppError (custom errors like "User Already Exist")
			if (err instanceof AppError) {
				return res.status(err.statusCode).json({
					success: false,
					message: err.message,
				});
			}

			// Handle Mongoose validation errors
			if (err.name === 'ValidationError') {
				const errors = Object.values(err.errors).map((e: any) => e.message);
				return res.status(400).json({
					success: false,
					message: 'Validation Failed',
					errors: errors,
				});
			}

			// Fallback for unexpected errors
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	}
	static async signIn(req: Request, res: Response) {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'All fields are required',
			});
		}

		try {
			const user = await AuthService.signIn(req.body);

			const payload = { id: user._id.toString(), role: user.role };
			const accessToken = generateAccessToken(payload);
			const refreshToken = generateRefreshToken(payload);

			// ✅ Save refresh token in DB
			const userInDB = await UserModel.findOne({ email: req.body.email });
			if (!userInDB) throw new AppError('User not found', 404);

			userInDB.refreshToken = refreshToken; // assign token
			await userInDB.save(); // persist in DB

			// Send refresh token as secure httpOnly cookie
			return res
				.status(200)
				.cookie('refreshToken', refreshToken, {
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
					sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
					secure: env.nodeEnv === 'production',
					httpOnly: true,
				})
				.json({
					success: true,
					message: 'User signed in successfully',
					data: {
						user: userInDB, // updated user object
						accessToken,
					},
				});
		} catch (err: any) {
			if (err instanceof AppError) {
				return res
					.status(err.statusCode)
					.json({ success: false, message: err.message });
			}
			return res
				.status(500)
				.json({ success: false, message: 'Internal Server Error' });
		}
	}

	static async signOut(req: Request, res: Response) {
		const userId = (req as any).user.id;
		if (!userId) {
			throw new AppError('Unauthorized', 401);
		}
		// remove the refresh token form the database
		await UserModel.findByIdAndUpdate(userId, {
			refreshToken: null,
		});

		// delete token from cookie
		return res.status(200).clearCookie('refreshToken').json({
			success: true,
			message: 'Sign-out successfully',
		});
	}

	static async getMe(req: Request, res: Response) {
		try {
			const userId = (req as any).user.id; // extracted from JWT
			const user = await AuthService.getMe(userId);

			return res.status(200).json({
				success: true,
				message: 'Get Current User Profile',
				data: { user },
			});
		} catch (err: any) {
			if (err instanceof AppError) {
				return res.status(err.statusCode).json({
					success: false,
					message: err.message,
				});
			}
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			});
		}
	}
}
