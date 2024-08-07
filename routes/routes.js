const {Router} = require('express');
const router = Router();
const {checkToken} = require('../utills/token');
const {createUser,getAllUsers,getOneUser,updateUser,deleteUser} = require('../services/userManager/user.controller');
const login = require('../services/userManager/auth');
const {addProduct,getOne,update,remove,getAll} = require('../services/products/product.controller');

// user manager routes
router.post('/user',createUser);
router.get('/user',checkToken,getAllUsers);
router.get('/user/:id',checkToken,getOneUser);
router.put('/user/:id',checkToken,updateUser);
router.delete('/user/:id',checkToken,deleteUser);

// login routes
router.post('/login',login);


//products routes
router.post('/product',addProduct);
router.get('/product',getAll);
router.get('/product/:id',checkToken,getOne);
router.put('/product/:id',checkToken,update);
router.delete('/product/:id',checkToken,remove);


module.exports=router;