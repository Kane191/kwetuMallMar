import jwt from "jsonwebtoken";
import userModel from "../../models/userModel.js";

const checkAuth = (req, res, next) =>{
    const { authorization } = req.headers;
    // Authorization is a variable that looks like:
    // 'Bearer eyvcyhrfuvfyhruvbfyuvbyuhbgvyhfbvgryhgvbyfhgvbfyuh'
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
        } 
        const { userId } = data;
        const user = await userModel.findOne({_id: userId});
        req.user = user;
        next();
    })
}

export default checkAuth;