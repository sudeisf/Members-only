const {Router} = require('express');
const router = Router();
const userController = require('../controllers/usersConotroller');
const {validator} = require('../utils/customValidator');




router.post('/register',validator,userController.registerControllerPost);














module.exports = router