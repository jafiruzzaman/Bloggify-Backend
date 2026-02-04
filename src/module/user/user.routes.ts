/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

import { Router, type Request, type Response } from 'express';

/*============================================== Node Modules ============================================== */
const router: Router = Router();

router.get('/:id', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'Get Single User ',
	});
});

router.get('/', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'Get All Users (Admin)',
	});
});

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
