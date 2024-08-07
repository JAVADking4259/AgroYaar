const User = require('../../utills/schema/user.schema');
const {addUser} = require('../../utills/schema.validate');
const jwt = require('jsonwebtoken');
const {validate} = require('../../utills/validate');

const createUser =  async (req,res)=>{
    try {
        const {body} = req;
        await validate(body,addUser);
        const {fullName,phoneNumber,password,userName} = body;
        let user = await User.findOne({phoneNumber});
        if(user){
          return  res.status(400).send({ error: 'User already exist' });
        }
        user = new User({fullName,phoneNumber,password,userName});
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error.error||  'خطای داخلی سیستم.' });
    }
};

const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }

};

const getOneUser = async (req,res)=>{
    try {
        const authorization = req.headers.authorization.split('Bearer ');
        const token = authorization[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(req.params.id);
        if(decodedToken.id===user.id){
        if(!user){
            return  res.status(400).send({ error: 'User not exists' });
        }
        res.status(200).json(user);
    }else{
        return  res.status(400).send({ error: 'token invalid' });
    }
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};

const updateUser = async (req,res) =>{
    try {
        const authorization = req.headers.authorization.split('Bearer ');
        const token = authorization[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(req.params.id)
        if(decodedToken.id === user.id){
            await user.updateOne(req.body);
        }else{
            return  res.status(400).send({ error: 'token invalid' });
        }
        res.status(200).json(user);
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};

const deleteUser = async (req,res)=>{
    try {
        const authorization = req.headers.authorization.split('Bearer ');
        const token = authorization[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(req.params.id);
        if(decodedToken.id === user.id){
        if(!user){
            return  res.status(400).send({ error: 'User not exists' });
        }
        await user.deleteOne();
    }else{
        return  res.status(400).send({ error: 'token invalid' });
    }
        res.status(200).send("user deleted");
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};


module.exports={createUser,getAllUsers,getOneUser,updateUser,deleteUser};