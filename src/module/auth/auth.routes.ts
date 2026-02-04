/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router } from 'express';
import type { Request, Response } from 'express';
const router: Router = Router();

router.get('/sign-up', (req: Request, res: Response) => {
	res.status(201).json({
		success: true,
		message: 'User Sign-up Successfully',
	});
});

router.get('/sign-in', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'User Sign-in Successfully',
	});
});

router.get('/sign-out', (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'User Sign-out Successfully',
	});
});

export { router as AuthRouter };
