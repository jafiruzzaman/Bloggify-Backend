/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router, type Request, type Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { UserController } from './user.controller.js';
import { authenticate } from '@middlewares/auth.middleware.js';
import { admin } from '@middlewares/admin.middleware.js';

const router: Router = Router();

router.get('/', authenticate, admin, UserController.getAllUsers);

router.get('/:id', authenticate, UserController.getUserById);

router.patch('/:id', authenticate, UserController.updateUser);

router.delete('/:id', authenticate, UserController.deleteUser);

export { router as userRouter };
