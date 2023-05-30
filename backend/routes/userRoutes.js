import express from "express";
import userModel from "../models/userModel.js";

const router = express.Router();

router.get('/', async(req, res)=> {
    try {
        const users = await userModel.find();
        res.send({
            message: 'Users fetched successfully!',
            data: users
        });
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

router.get('/:id', async(req, res)=> {
    try {
        const user = await userModel.findOne({_id: req.params.id});
        res.send({
            message: 'User fetched successfully!',
            data: user
        })
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        })
    }
});

router.post('/delete/:id', async (req, res)=>{
    try {
        await userModel.deleteOne({_id:req.params.id})
        res.send({
            message: 'Deleted user successfully!'
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

export default router;