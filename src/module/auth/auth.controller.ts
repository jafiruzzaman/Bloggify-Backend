import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import { AppError } from '@utils/appError';

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
}
