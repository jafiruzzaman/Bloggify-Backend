/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router } from 'express';

/*============================================== Custom Modules ============================================== */
import { signInSchema, signUpSchema } from '@validation/auth.validation';
import { validate } from 'middlewares/validate.middleware';
import { AuthController } from './auth.controller';
import { authenticate } from 'middlewares/auth.middleware';
const router: Router = Router();

router.post('/sign-up', validate(signUpSchema), AuthController.signUp);

router.post('/sign-in', validate(signInSchema), AuthController.signIn);

router.post('/sign-out', authenticate, AuthController.signOut);

router.get('/me', authenticate, AuthController.getMe);

export { router as AuthRouter };
