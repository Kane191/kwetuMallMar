import express from "express";
import userModel from "../models/userModel.js";
import checkAuth from "./auth/checkAuth.js";

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

router.get('/getme', checkAuth, (req, res)=>{
    try {
        res.send({
            message: 'Successfully fetched authenticated user!',
            data: req.user
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

router.post('/update/me', checkAuth, async (req, res)=>{
    try {
        const user = await userModel.findOne({_id: req.user._id});
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.phoneNumber = req.body.phoneNumber;
        const newUser = await user.save();
        res.send({
            message: 'Updated user successfully!',
            data: newUser
        })
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

router.post('/update/:id', async (req, res)=>{
    try {
        const user = await userModel.findOne({_id: req.params.id});
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.phoneNumber = req.body.phoneNumber;
        const newUser = await user.save();
        res.send({
            message: 'Updated user successfully!',
            data: newUser
        })
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
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