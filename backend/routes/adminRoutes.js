import express from "express";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import salesModel from "../models/salesModel.js";
import adminCheckAuth from "./auth/adminCheckAuth.js";

const router = express.Router();

router.get('/', adminCheckAuth, async(req, res)=> {
    try {
        const admins = await adminModel.find();
        const otherAdmins = admins.filter((admin)=>{
            return admin.email !== req.admin.email;
        })
        res.send({
            message: 'Fetched all admins successfully!',
            data: otherAdmins
        });
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

router.get('/me', adminCheckAuth, async(req, res)=> {
    try {
        res.send({
            message: 'Fetched my admin account successfully!',
            data: req.admin
        });
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

router.get('/reports', adminCheckAuth, async(req, res)=>{
    try {
        const users = await userModel.find();
        const sales = await salesModel.find();
        console.log(sales)
        const salesSum = sales.reduce(((a,b)=> a + b.sellingPrice), 0);
        const bpSum = sales.reduce(((a,b)=> a + b.buyingPrice), 0);
        res.send({
            message: 'Reports fetched successfully',
            users: users.length,
            sales: sales.length,
            salesSum: salesSum,
            profit: salesSum - bpSum
        });
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

router.get('/:id', adminCheckAuth, async(req, res)=> {
    try {
        const admin = await adminModel.findOne({_id:req.params.id});
        res.send({
            message: 'Fetched admin successfully!',
            data: admin
        });
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

router.post('/update/:id', adminCheckAuth, async (req, res)=>{
    try {
        const admin = await adminModel.findOne({_id: req.params.id});
        admin.firstName = req.body.firstName;
        admin.lastName = req.body.lastName;
        admin.email = req.body.email;
        admin.phoneNumber = req.body.phoneNumber;
        const newAdmin = await admin.save();
        res.send({
            message: 'Updated admin successfully!',
            data: newAdmin
        })
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

router.post('/me/update', adminCheckAuth, async (req, res)=>{
    try {
        const admin = await adminModel.findOne({_id: req.admin._id});
        admin.firstName = req.body.firstName;
        admin.lastName = req.body.lastName;
        admin.email = req.body.email;
        admin.phoneNumber = req.body.phoneNumber;
        const newAdmin = await admin.save();
        res.send({
            message: 'Updated admin successfully!',
            data: newAdmin
        })
    } catch (error) {
        res.send({
            message: 'Error',
            data: error.message
        });
    }
});

router.post('/delete/:id', adminCheckAuth, async (req, res)=>{
    try {
        await adminModel.deleteOne({_id:req.params.id})
        res.send({
            message: 'Deleted admin successfully!'
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        });
    }
});



export default router;