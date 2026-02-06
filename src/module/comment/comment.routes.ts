/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router, type Request, type Response } from 'express';

/*============================================== Custom Modules ============================================== */
import { authenticate } from '@middlewares/auth.middleware.ts';

/*============================================== Routes ============================================== */
const router: Router = Router();

router.post('/', authenticate, (req: Request, res: Response) => {
	res.status(201).json({
		success: true,
		message: 'Comment Posted Successfully',
	});
});

router.get('/blog/:blog_id/', authenticate, (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'Get All Comments',
	});
});

router.get('/:comment_id', authenticate, (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'Get Single Comment',
	});
});

router.patch('/:comment_id', authenticate, (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message: 'Comment Updated Success',
	});
});
router.delete('/:comment_id', authenticate, (req: Request, res: Response) => {
	res.status(204).json({
		success: true,
		message: 'Comment Updated Success',
	});
});

/*============================================== Export Routes ============================================== */
export { router as CommentRouter };
