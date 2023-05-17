import {model, Schema} from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    image: {
        type: String,
        required: true
    },
    images: [String],
    price: {
        type: Number,
        required: true,
    }, 
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category: [String],
});

export default model("productModel", productSchema);