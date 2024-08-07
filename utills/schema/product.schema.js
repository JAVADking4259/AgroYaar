const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    farmerId:{
        type:String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    typeOfProduct: {
        type: String,
        required: true,
    },
    plantingDate: {
        type: String,
        required: true
    },
    harvestDate: {
        type: String,
        required: true
    },
    existence:{
        type:String
    },
    price:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

const Peroduct = mongoose.model('Product', productSchema);

module.exports = Peroduct;
