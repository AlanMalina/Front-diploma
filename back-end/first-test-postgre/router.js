import Router from 'express';
import PostController from './PostController.js';

const router = new Router();

router.post('/post', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.deleteOne)


export default router;