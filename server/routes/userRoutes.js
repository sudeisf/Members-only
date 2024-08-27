const {Router} = require('express');
const router = Router();
const userController = require('../controllers/usersConotroller');
const {validator} = require('../utils/customValidator');
const passport = require('passport');




router.post('/register',validator,userController.registerControllerPost);
router.post('/login',userController.loginControllerPost);














module.exports = router