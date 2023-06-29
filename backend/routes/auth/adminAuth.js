import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../../models/adminModel.js";
// import checkAuth from "./checkAuth.js";

const router = express.Router();
const saltRound = 10;

// router.get('/check/if/logged/in', checkAuth, (req,res)=>{
//     res.send({
//         message: `Hello, ${req.user.firstName} ${req.user.lastName}`,
//         data: req.user
//     });
// });

router.post('/register', (req, res)=>{
    try {
        if(!req.body || !req.body.password){
            res.send({
                message: 'Admin details not found'
            })
        }
 
        bcrypt.hash(req.body.password, saltRound, async (err, hash)=>{
            if(err){
                console.log(err);
            }
            const newAdmin = new adminModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash
            });
            const admin = await newAdmin.save();
            const token = jwt.sign({adminId : admin._id}, 'MY_SECRET_KEY');
            res.send({
                message: 'Admin created successfully!',
                data: admin,
                token: token
            });
        });   
    } catch (error) {
        console.log(error); 
        res.send({
            message: error.message
        });
    }
});

router.post('/login', async (req, res)=>{
    if(!req.body.email || !req.body.password){
        res.send({
            message: 'Provide email and password!'
        })
    }
    const admin = await adminModel.findOne({email: req.body.email})
    if(!admin){
        res.send({
            message: 'Wrong password or email'
        })
    } else{
        bcrypt.compare(req.body.password, admin.password, (err, response)=>{
            if(err){
                console.log(err)
            }
            if(response === false){
                res.send({
                    message: 'Wrong password or email'
                })
            }else if (response === true){
                const token = jwt.sign({adminId : admin._id}, 'MY_SECRET_KEY');
                res.send({
                    message: 'Admin successfully authenticated!',
                    data: admin,
                    token: token
                })
            }
        });
    }
});

// view all users

// delete a user
export default router;