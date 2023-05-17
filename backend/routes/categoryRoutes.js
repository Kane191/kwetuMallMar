import express from "express";
import categoryModel from "../models/categoryModel.js";

const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        const categories = await categoryModel.find();
        res.send({
            message: 'Fetched categories successfully!',
            data: categories 
        }); 
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        });
    }
})

router.post('/create', async (req, res)=>{
    try {
        const newCategory = new categoryModel({
            name: req.body.name
        })
        const category = await newCategory.save();
        res.send({
            message: 'Created category successfully!',
            data: category
        })
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        });
    }
});

router.get('/:id', async (req, res)=>{
    try {
       const id = req.params.id;
       const category = await categoryModel.findOne({_id:id});
       res.send({
        message: 'Fetched category successfully',
        data: category
       });
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
       const category = await categoryModel.findOne({_id : id});
       category.name = req.body.name;
       const result = await category.save();
       res.send({
        message: 'Updated category successfully!',
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
        await categoryModel.deleteOne({_id:req.params.id})
        res.send({
            message: 'Deleted category successfully!'
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        });
    }
});


export default router;