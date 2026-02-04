/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router, type Request, type Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { UserController } from './user.controller';
import { authenticate } from '@middlewares/auth.middleware.ts';
import { admin } from '@middlewares/admin.middleware';

const router: Router = Router();

router.get('/', authenticate, admin, UserController.getAllUsers);

router.get('/:id', authenticate, UserController.getUserById);

router.put('/:id', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'Update User by User/Admin',
	});
});

router.delete('/:id', (req: Request, res: Response) => {
	res.status(204).json({
		success: true,
		message: 'Delete User by User/Admin',
	});
});

export { router as userRouter };
