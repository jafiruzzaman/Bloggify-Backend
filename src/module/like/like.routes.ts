/**
 * @copyright 2026 Mohammad Jafiruzzaman
 */

/*============================================== Node Modules ============================================== */
import { Router } from 'express';

/*============================================== Custom Modules ============================================== */
import { authenticate } from '@middlewares/auth.middleware.js';
import { LikeController } from './like.controller.js';

/*============================================== Router ============================================== */
const router = Router();

/*============================================== Routes ============================================== */
router.post('/:blog_id', authenticate, LikeController.LikeBlog);

router.delete('/:blog_id', authenticate, LikeController.DislikeBlog);

/*============================================== Router ============================================== */
export { router as LikeRouter };
