/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import type { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err); // log for debugging

	let statusCode = err.statusCode || 500;
	let message = err.message || 'Something went wrong';

	// Handle MongoDB duplicate key error
	if (err.code === 11000) {
		statusCode = 400; // Bad request
		const field = Object.keys(err.keyValue)[0];
		message = `Duplicate value for '${field}' is not allowed`;
	}

	res.status(statusCode).json({
		success: false,
		message,
		error: err,
	});
};
