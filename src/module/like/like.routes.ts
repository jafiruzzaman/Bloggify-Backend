/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router, type Request, type Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { authenticate } from '@middlewares/auth.middleware.ts';

const router = Router();

router.post('/:blog_id', authenticate, async (req: Request, res: Response) => {
	// service.likeBlog(req.user.id, req.params.blog_id)
	return res.status(201).json({
		success: true,
		message: 'Blog liked successfully',
	});
});

/**
 * Unlike a blog
 */
router.delete(
	'/:blog_id',
	authenticate,
	async (req: Request, res: Response) => {
		// service.unlikeBlog(req.user.id, req.params.blog_id)
		return res.status(204).send();
	}
);

export { router as LikeRouter };
