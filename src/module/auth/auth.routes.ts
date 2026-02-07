/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router } from 'express';

/*============================================== Custom Modules ============================================== */
import { signInSchema, signUpSchema } from '@validation/auth.validation.js';
import { validate } from 'middlewares/validate.middleware.js';
import { AuthController } from './auth.controller.js';
import { authenticate } from 'middlewares/auth.middleware.js';
const router: Router = Router();

router.post('/sign-up', validate(signUpSchema), AuthController.signUp);

router.post('/sign-in', validate(signInSchema), AuthController.signIn);

router.post('/sign-out', authenticate, AuthController.signOut);

router.get('/me', authenticate, AuthController.getMe);

export { router as AuthRouter };
