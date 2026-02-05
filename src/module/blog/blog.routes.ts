/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router, type Request } from 'express';
import type { Response } from 'express';

/*============================================== Node Modules ============================================== */
import { BlogController } from '@module/blog/blog.controller.ts';
import { authenticate } from '@middlewares/auth.middleware.ts';

const router: Router = Router();

router.post('/', authenticate, BlogController.createBlog);

router.get('/', BlogController.GetAllBlogs);

router.get('/:slug', (req: Request, res: Response) => {
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
