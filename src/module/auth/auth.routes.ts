/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { signInSchema, signUpSchema } from '@validation/auth.validation';
import { Router } from 'express';
import type { Request, Response } from 'express';
import { validate } from 'middlewares/validate.middleware';
import { AuthController } from './auth.controller';
import { authenticate } from 'middlewares/auth.middleware';
const router: Router = Router();

router.post('/sign-up', validate(signUpSchema), AuthController.signUp);

router.post('/sign-in', validate(signInSchema), AuthController.signIn);

router.post('/sign-out', authenticate, AuthController.signOut);

export { router as AuthRouter };
