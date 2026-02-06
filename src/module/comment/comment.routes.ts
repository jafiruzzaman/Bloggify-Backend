/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router } from 'express';

/*============================================== Custom Modules ============================================== */
import { authenticate } from '@middlewares/auth.middleware.ts';
import { CommentController } from './comment.controller.ts';

/*============================================== Routes ============================================== */
const router: Router = Router();

router.post('/blog/:blog_id', authenticate, CommentController.PostComment);

router.get(
	'/blog/:blog_id/',
	authenticate,
	CommentController.GetCommentsByBlog
);

router.get('/:comment_id', authenticate, CommentController.GetComment);

router.patch('/:comment_id', authenticate, CommentController.UpdateComment);
router.delete('/:comment_id', authenticate, CommentController.DeleteComment);

/*============================================== Export Routes ============================================== */
export { router as CommentRouter };
