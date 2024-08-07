const Product = require('../../utills/schema/product.schema');
const jwt = require('jsonwebtoken');
const {addingProduct} = require('../../utills/schema.validate');
const {validate} = require('../../utills/validate');

const addProduct = async(req,res)=>{
    try {
        const {body} = req;
        await validate(body,addingProduct);
        const {
            farmerId,
            name,
            typeOfProduct,
            plantingDate,
            harvestDate,
            existence,
            price  } = body;

        const product = new Product({farmerId,name,typeOfProduct,plantingDate,harvestDate,existence,price});
        await product.save();
        res.status(200).json(product);    
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).send({ error: error.error|| 'خطای داخلی سیستم.' });
    }
};

const getOne = async(req,res)=>{
    try {
        const authorization = req.headers.authorization.split('Bearer ');
        const token = authorization[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const product = await Product.findById(req.params.id);
        if(decodedToken.id===product.farmerId){
        if(!product){
            return  res.status(400).send({ error: 'this product not exists' });
        }
        res.status(200).json(product);
    }else{
        return  res.status(400).send({ error: 'token invalid' });
    }
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};

const getAll = async (req,res)=>{
    try {
        // search
        const searchQuery = req.query.search ? { name: new RegExp(req.query.search, 'i') } : {};
        // pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        // sort 
        const sortField = req.query.sortBy || 'dateAdded';
        const sortOrder = req.query.order === 'desc' ? -1 : 1;

        const products = await Product.find(searchQuery).sort({[sortField]: sortOrder }) .skip((page - 1) * limit).limit(limit);
        res.status(200).json(products);
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};

const update = async (req,res)=>{
    try {
        const authorization = req.headers.authorization.split('Bearer ');
        const token = authorization[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const product = await Product.findById(req.params.id);
        if(decodedToken.id === product.farmerId){
        if(!product){
            return  res.status(400).send({ error: 'this product not exists' });
        };
        await product.updateOne(req.body);
        res.status(200).json(product);
    }else{
        return  res.status(400).send({ error: 'token invalid' });
    }
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};

const remove = async(req,res)=>{
    try {
        const authorization = req.headers.authorization.split('Bearer ');
        const token = authorization[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const product = await Product.findById(req.params.id);
        if(decodedToken.id === product.farmerId){
        if(product.deletedCount===0){
            return  res.status(400).send({ error: 'this product not exists' });
        }
        await product.deleteOne();
        res.status(200).send("successfuly delete");
    }else{
        return  res.status(400).send({ error: 'this product not exists' });
    }
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};


module.exports={addProduct,getOne,update,remove,getAll};