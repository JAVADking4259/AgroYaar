const {Router} = require('express');
const router = Router();
const {checkToken} = require('../utills/token');
const {createUser,getAllUsers,getOneUser,updateUser,deleteUser} = require('../services/userManager/user.controller');
const login = require('../services/userManager/auth');

router.post('/user',createUser);
router.get('/user',checkToken,getAllUsers);
router.get('/user/:id',checkToken,getOneUser);
router.put('/user/:id',checkToken,updateUser);
router.delete('/user/:id',checkToken,deleteUser);


router.post('/login',login);

module.exports=router;