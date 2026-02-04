/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router, type Request, type Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { UserController } from './user.controller.ts';
import { authenticate } from '@middlewares/auth.middleware.ts';
import { admin } from '@middlewares/admin.middleware.ts';

const router: Router = Router();

router.get('/', authenticate, admin, UserController.getAllUsers);

router.get('/:id', authenticate, UserController.getUserById);

router.patch('/:id', authenticate, UserController.updateUser);

router.delete('/:id', (req: Request, res: Response) => {
	res.status(204).json({
		success: true,
		message: 'Delete User by User/Admin',
	});
});

export { router as userRouter };
