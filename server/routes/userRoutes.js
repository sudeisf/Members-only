const {Router} = require('express');
const router = Router();
const userController = require('../controllers/usersConotroller');
const {validator} = require('../utils/customValidator');
const passport = require('passport');
const { privateClubGet, privateJoinClubGet , privateGetClubs ,privatePostControllerPost,privatePostControllerGet} = require('../controllers/protectedController');
const {createPost,getPost} = require ('../controllers/postController');





router.post('/register',validator,userController.registerControllerPost);
router.post('/login',userController.loginControllerPost);

router.post('/post',passport.authenticate('jwt',{session:false}),privatePostControllerPost);
router.get('/post',passport.authenticate('jwt',{session:false}),privatePostControllerGet);




router.get('/club',passport.authenticate('jwt',{session:false}),privateClubGet);
router.get('/clubs',passport.authenticate('jwt',{session:false}),privateGetClubs);
router.post('/club-join/:id',passport.authenticate('jwt',{session:false}),privateJoinClubGet);

router.post('/post/:id',passport.authenticate('jwt',{session:false}),createPost);
router.get('/post/:id',passport.authenticate('jwt',{session:false}),getPost);







module.exports = router;