const {Router} = require('express');
const router = Router();
const userController = require('../controllers/usersConotroller');
const {validator} = require('../utils/customValidator');
const passport = require('passport');
const { privatePostController, privateClubGet, privatePostControllerGet, privateJoinClubGet } = require('../controllers/protectedController');
const { publicPostGet } = require('../controllers/publicRouteController');




router.post('/register',validator,userController.registerControllerPost);
router.post('/login',userController.loginControllerPost);


router.get('/posts',passport.authenticate('jwt',{session:false}),privatePostControllerGet);
router.get('/post',publicPostGet);




router.get('/club',privateClubGet);
router.get('/club-join',passport.authenticate('jwt',{session:false}),privateJoinClubGet);





module.exports = router