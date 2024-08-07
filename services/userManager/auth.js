const User = require('../../utills/schema/user.schema');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../../utills/token');

const login = async (req,res)=>{
    try {
        const {body} = req;
        const {phoneNumber,password} = body;
        let user = await User.findOne({phoneNumber});
        const isMatch = await bcrypt.compare(password,user.password)
        if(!user){
           return res.status(400).send({ error: 'User not exists please register' });
        }
        if(!isMatch){
           return res.status(400).send({ error: 'password or phonrNumber is wrong' });
        }
        user.token = await generateToken(user)
        res.status(200).json(user);

    } catch (error) {
         const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};

module.exports=login;