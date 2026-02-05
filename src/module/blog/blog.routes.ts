/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router, type Request } from 'express';
import type { Response } from 'express';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
	return res.status(201).json({
		success: true,
		message: 'Blog Created Successfully',
	});
});

router.get('/', (req: Request, res: Response) => {
	return res.status(200).json({
		success: true,
		message: 'Get All Blogs Successfully',
	});
});

router.get('/:id', (req: Request, res: Response) => {
	return res.status(200).json({
		success: true,
		message: 'Get Blog Successfully',
	});
});

router.patch('/:id', (req: Request, res: Response) => {
	return res.status(200).json({
		success: true,
		message: 'Blog Updated Successfully',
	});
});

router.delete('/:id', (req: Request, res: Response) => {
	return res.status(204).json({
		success: true,
		message: 'Blog deleted Successfully',
	});
});

export { router as BlogRouter };
