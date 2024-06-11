import Router from 'express';
import PostController from './PostController.js';
import UserController from './UserController.js';
import validateVolunteer from './middlewares/validate_Volunteer.js';
import validateMilitary from './middlewares/validate_Military.js';
import validateDonor from './middlewares/validate_Donor.js';
import JwtToken from './JWT-token.js';
import RequestController from './RequestController.js';
import ICEI from './ICEI.js';

const router = new Router();


router.post('/post', validateVolunteer, PostController.create)
router.post('/user', UserController.addUser)
router.post('/login', UserController.logIn)
router.get('/posts', JwtToken.validateToken, PostController.getAll)
router.get('/profile_auth/:id', JwtToken.validateToken, UserController.getMyProfile)
router.get('/publicProf/:id', UserController.getPublicProfile);
router.get('/posts/:id', PostController.getOne)
router.get('/users/:id', UserController.getOneUser)
router.put('/posts/:id', JwtToken.validateToken, PostController.update)
router.delete('/posts/:id', PostController.deleteOne)
router.delete('/posts', PostController.deleteAll)
router.put('/user/:id', UserController.updateUser);
router.post('/following', JwtToken.validateToken, UserController.postFollowing)
router.get('/followingCounts/:id', JwtToken.validateToken, UserController.getFollowingCount)
router.get('/postsCount/:user_id', JwtToken.validateToken, PostController.getPostsCount)  
router.post('/createRequest', validateMilitary, RequestController.createRequest)
router.get('/getOwnReq/:id', validateMilitary, RequestController.getOwn)
router.get('/getRequests', validateVolunteer, RequestController.getAll)
router.post('/addVolunteerReq', validateVolunteer, RequestController.addVolunteerReq)
router.get('/getAccept/:id', validateVolunteer, RequestController.getAccept)
router.get('/getWaiting/:id', RequestController.getWaiting)
router.delete('/finishReq/:id', RequestController.finishRequest)
router.get('/user-info', async (req, res) => {
    try {
      const userInfo = await ICEI.getUserInfo(req.query.role);
      res.json(userInfo);
    } catch (error) {
      res.status(error.response?.status || 500).send(error.message);
    }
  });

export default router;