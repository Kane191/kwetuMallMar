import express from "express";
import checkAuth from "./auth/checkAuth.js";
import userModel from "../models/userModel.js";
import salesModel from "../models/salesModel.js";
import productModel from "../models/productModel.js";

const router = express.Router();

router.post('/add/:id', checkAuth, async (req, res)=>{
    // [{productId: nbcdehjwk, quantity: 2}, {productId: nbcdehjwk, quantity: 1}]
    let productId = req.params.id
    const user = await userModel.findOne({_id: req.user._id});
    let cart = user.cart
    let inCart = false;
    for(let i = 0; i<cart.length; i++){
        if(productId === cart[i].productId){
            inCart = true;
        }
    }
    if (inCart === true){
        res.send({
            message: 'Product already in cart'
        })
    }else if(inCart === false){
        user.cart = [...user.cart, {productId: productId, quantity: req.body.quantity}];
        let result = await user.save();
        res.send({
            message: 'Added to cart successfully!',
            data: result,
        });
    }
});

router.get('/get', checkAuth, async(req, res)=>{
    let cart = req.user.cart;
    let products = []
    for(let i = 0; i< cart.length; i++){
        let product = await productModel.findOne({_id: cart[i].productId});
        products = [...products, {product:product, quantity: cart[i].quantity}]
    }
    res.send({
        message: 'Fetched cart successfully!',
        data: products
    })
});

router.get('/items/count', checkAuth, (req, res)=>{
    const cart = req.user.cart;
    res.send({
        message: 'Found total items in cart',
        number: cart.length
    })
});

router.post('/clear', checkAuth, async (req, res)=>{
    try {
        let cart = req.body
        const user = await userModel.findOne({_id: req.user._id});
        for(let i = 0; i < cart.length; i++){
            const product = await productModel.findOne({_id: cart[i].product._id});
            product.stock = product.stock - cart[i].quantity;
            await product.save();
            // save sale
            const newSale = new salesModel({
                productId: product._id,
                userId: user._id,
                buyingPrice: product.buyingPrice * cart[i].quantity,
                sellingPrice: product.price * cart[i].quantity
            })
            await newSale.save();
        }

        user.cart = [];
        const result = await user.save();
        res.send({
            message: 'Checked out successfully!',
            data: result,
        });
    } catch (error) {
        res.send({
            message: error.message
        })
    }
});

export default router;