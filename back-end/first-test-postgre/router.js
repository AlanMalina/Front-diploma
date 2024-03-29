import Router from 'express';
import PostController from './PostController.js';

const router = new Router();


router.post('/post', PostController.create)
router.post('/user', PostController.addUser)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.get('/users/:id', PostController.getOneUser)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.deleteOne)
router.delete('/posts', PostController.deleteAll)

export default router;