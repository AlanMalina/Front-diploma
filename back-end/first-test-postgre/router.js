import Router from 'express';
import PostController from './PostController.js';
import monobank from './monobank.js';
import diia from './diia.js';
import UserController from './UserController.js';

const router = new Router();


router.post('/post', PostController.create)
router.post('/user', UserController.addUser)
router.post('/login', UserController.logIn)
router.get('/posts', PostController.getAll)
router.get('/profile_auth/:id', UserController.getMyProfile)
router.get('/posts/:id', PostController.getOne)
router.get('/users/:id', UserController.getOneUser)
router.put('/posts/:id', PostController.update)
router.delete('/posts/:id', PostController.deleteOne)
router.delete('/posts', PostController.deleteAll)
router.get('/money', monobank.getCurrencyRates)
router.get('/clientId', monobank.getClientId)
router.put('/user/:id', UserController.updateUser);
router.post('/createPayment', async (req, res) => {
    try {
        const { recipientName, recipientAccount, amount, description } = req.body;
        await monobank.paymentOnAccount(req, res, recipientName, recipientAccount, amount, description);
    } catch (error) {
        console.error('Помилка створення платежу:', error.message);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
});

router.get('/diia', diia.getData)
// router.put('/following/:id', PostController.postFollowers);
router.post('/following', UserController.postFollowing)
router.get('/followingCounts/:id', UserController.getFollowingCount)
router.get('/postsCount/:user_id', PostController.getPostsCount)  

export default router;