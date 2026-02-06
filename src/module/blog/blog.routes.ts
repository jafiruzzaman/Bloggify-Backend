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

router.get('/:slug', BlogController.GetBlogBySlug);

router.patch('/:id', authenticate, BlogController.updateBlog);

router.delete('/:id', authenticate, BlogController.deleteBlog);

export { router as BlogRouter };
