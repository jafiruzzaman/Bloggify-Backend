/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { z } from 'zod';

export const signUpSchema = z.object({
	body: z.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(8),
	}),
});

export const signInSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string().min(8),
	}),
});
