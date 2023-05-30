import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/userModel.js";
import checkAuth from "./checkAuth.js";

const router = express.Router();
const saltRound = 10;

router.get('/check/if/logged/in', checkAuth, (req,res)=>{
    res.send({
        message: `Hello, ${req.user.firstName} ${req.user.lastName}`,
        data: req.user
    });
});

router.post('/register', (req, res)=>{
    try {
        if(!req.body || !req.body.password){
            res.send({
                message: 'User details not found'
            })
        }
 
        bcrypt.hash(req.body.password, saltRound, async (err, hash)=>{
            if(err){
                console.log(err);
            }
            const newUser = new userModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash
            });
            const user = await newUser.save();
            const token = jwt.sign({userId : user._id}, 'MY_SECRET_KEY');
            res.send({
                message: 'User created successfully!',
                user: user,
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
    const user = await userModel.findOne({email: req.body.email})
    if(!user){
        res.send({
            message: 'Wrong password or email'
        })
    } else{
        bcrypt.compare(req.body.password, user.password, (err, response)=>{
            if(err){
                console.log(err)
            }
            if(response === false){
                res.send({
                    message: 'Wrong password or email'
                })
            }else if (response === true){
                const token = jwt.sign({userId : user._id}, 'MY_SECRET_KEY');
                res.send({
                    message: 'User successfully authenticated!',
                    data: user,
                    token: token
                })
            }
        });
    }
});

// view all users

// delete a user
export default router;