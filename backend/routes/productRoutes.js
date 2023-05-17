import express from "express";
import productModel from "../models/productModel.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();
// Assignment
// getting all products and getting one product

router.get('/', async (req, res)=>{
    try {
        const products = await productModel.find();
        res.send({
            message: 'Fetched products successfully!',
            data: products 
        }); 
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        });
    }
})

const upload = multer({ dest: 'uploads'})
const uploadProductImages = upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'images', maxCount: 4}
]);

router.post('/create',uploadProductImages, async (req,res)=>{
    try {
        console.log(req.files)
        let image = req.files.image[0]
        let extension = (image.mimetype).split('/')[1]
        let imageNewFileName = image.filename + '.' + extension
        fs.rename(`./uploads/${image.filename}`, `./uploads/${imageNewFileName}`,()=> console.log('Renamed image successfully'))
    
        let images = req.files.images
        let renamedImages = images.map((img)=>{
            let imgExtension = img.mimetype.split('/')[1];
            let imgNewFileName = img.filename + '.' + imgExtension;
            fs.rename(`./uploads/${img.filename}`, `./uploads/${imgNewFileName}`,()=> console.log('Renamed image successfully'));
            return imgNewFileName;
        })
        console.log(renamedImages);
    
        // save to db
        const product = new productModel({
            name: req.body.name,
            image: imageNewFileName,
            images: renamedImages,
            price: req.body.price, 
            stock: req.body.stock,
            description: req.body.description,
            category: req.body.category
        })
        const data = await product.save();
    
        res.send({
            message: 'Product created successfully!',
            data: data
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        });
    }
});

router.post('/update/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const product = await productModel.findOne({_id : id});
        product.name = req.body.name;
        product.price = req.body.price;
        product.stock = req.body.stock;
        product.description = req.body.description;
        product.category = req.body.category;
        const result = await product.save();
        res.send({
         message: 'Updated product successfully!',
         data: result
        });
     } catch (error) {
         console.log(error);
         res.send({
             message: error.message
         });
     }
});

router.post('/delete/:id', async (req, res)=>{
    try {
        const product = await productModel.findOne({_id : req.params.id})
        // console.log(product)
        fs.unlink('./uploads/'+product.image, function (err) {
            if (err) {
                console.log(err)
            }
            console.log('File deleted!');
        }); 
        product.images.map((img)=>{
            fs.unlink('./uploads/'+img, function (err) {
                if (err) {
                    console.log(err)
                }
                console.log('File deleted!');
            }); 
        });
        await productModel.deleteOne({_id:req.params.id})
        res.send({
            message: 'Deleted product successfully!'
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        });
    }
});

export default router;