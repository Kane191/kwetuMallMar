import jwt from "jsonwebtoken";
import adminModel from "../../models/adminModel.js";

const checkAuth = (req, res, next) =>{
    const { authorization } = req.headers;
    if(!authorization){
        res.send({
            message: 'You must be logged in!'
        }); 
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err, data)=>{
        if(err){
            res.send({
                message: 'You must be logged in!',
                error: err.message
            })
        } else {
            const { adminId } = data;
            const admin = await adminModel.findOne({_id: adminId});
            req.admin = admin;
            next();
        }
    })
}

export default checkAuth;