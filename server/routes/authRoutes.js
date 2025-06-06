const { Router } = require('express');
const Auth = require('../controllers/authControllers')
const router = Router();
const passport = require('passport');


router.post('/login',Auth.login);
router.post('/register',Auth.register);
router.post('/email',Auth.sendOtp);
router.post('/new-password',Auth.newPassword);
router.post('/verify-otp',Auth.verifyOTP);
router.get('/refreshToken',Auth.refreshToken);
router.post('/logout',passport.authenticate('jwt', { session: false }),Auth.logout)

module.exports = router;