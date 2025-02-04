const { Router } = require('express');
const router = Router();
const userController = require('../controllers/usersConotroller');
const { validator } = require('../utils/customValidator');
const auth = require('../middleware/auth');  
const {
    privateClubGet,
    privateJoinClubGet,
    privateMessagePost,
    getClubsJoined,
    getClubById,
    privateGetClubs,
    privatePostControllerGetTwo,
    privatePostControllerGet
} = require('../controllers/protectedController');
const { createPost, getPost } = require('../controllers/postController');


// Public Routes
router.post('/register', validator, userController.registerControllerPost);
router.post('/login', userController.loginControllerPost);

// Protected Routes
router.get('/post', auth, privatePostControllerGet);  
router.get('/user', auth, userController.getUserController);  
router.get('/club', auth, privateClubGet);  
router.get('/clubs', auth, privateGetClubs);  
router.post('/club-join/:id', auth, privateJoinClubGet);  
router.get('/club-joined', auth, getClubsJoined);  
router.get('/club-joined/:id', auth, getClubById);  
router.post('/post/:id', auth, createPost);  
router.get('/post/:id', auth, getPost);  
router.get('/message', auth, privatePostControllerGetTwo);    
router.post('/postMessage', auth, privateMessagePost);  


router.get('/logout',auth, (req,res)=>{
    req.cookies.clearCookie('token');
    req.session.destroy();
    res.status(200).json({message: "User has been logged out successfully"})
})
router.get('/user',auth , (req,res)=>{
    if(req.user){
        res.status(200).json({isAuthenticated: true, user: req.user})
    }else{
        res.status(401).json({isAuthenticated: false, user: null})
    }
})
module.exports = router;
