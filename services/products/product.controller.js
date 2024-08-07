const Product = require('../../utills/schema/product.schema');

const addProduct = async(req,res)=>{
    try {
        const {body} = req;
        const {
            id,
            name,
            typeOfProduct,
            plantingDate,
            harvestDate,
            existence,
            price  } = body;

        const product = new Product({id,name,typeOfProduct,plantingDate,harvestDate,existence,price});
        await product.save();
        res.status(200).json(product);    
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};

const getOne = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return  res.status(400).send({ error: 'this product not exists' });
        }
        res.status(200).json(product);
    } catch (error) {
        const statusCode = error.status || 500
        res.status(statusCode).json({ error: error?.data?.message || 'خطای داخلی سیستم.' });
    }
};

// getAll
