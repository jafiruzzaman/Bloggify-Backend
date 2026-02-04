/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { signInSchema, signUpSchema } from '@validation/auth.validation';
import { Router } from 'express';
import type { Request, Response } from 'express';
import { validate } from 'middlewares/validate.middleware';
import { AuthController } from './auth.controller';
const router: Router = Router();

router.post('/sign-up', validate(signUpSchema), AuthController.signUp);

router.post('/sign-in', validate(signInSchema), AuthController.signIn);

router.get('/sign-out', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'User Sign-out Successfully',
	});
});

export { router as AuthRouter };
