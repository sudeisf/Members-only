const {Router} = require('express');
const router = Router();
const userController = require('../controllers/usersConotroller');
const {validator} = require('../utils/customValidator');
const passport = require('passport');
const { privatePostController, privateClubGet, privatePostControllerGet, privateJoinClubGet , privateGetClubs } = require('../controllers/protectedController');
const { publicPostGet } = require('../controllers/publicRouteController');




router.post('/register',validator,userController.registerControllerPost);
router.post('/login',userController.loginControllerPost);


// router.get('/posts',passport.authenticate('jwt',{session:false}),privatePostControllerGet);
router.get('/post',publicPostGet);




router.get('/club',passport.authenticate('jwt',{session:false}),privateClubGet);
router.get('/clubs',passport.authenticate('jwt',{session:false}),privateGetClubs);
router.post('/club-join/:id',passport.authenticate('jwt',{session:false}),privateJoinClubGet);





module.exports = router;