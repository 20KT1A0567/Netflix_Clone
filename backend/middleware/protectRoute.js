import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";
 export const protectRoute =async(req,res,next)=>{
    try {
        const token = req.cookies["jwt-netflix"];
        if(!token){
            return res.status(401).json({success:false,token:"unauthorized - no token is provided"})
        }
        const decoded = jwt.verify(token,ENV_VARS.JWT_SCERET);
        if(!decoded){
            return res.status(401).json({success:false,token:"unauthorized Invalid-token"});
        }
        const user2 = await user.findById(decoded.userId).select("-password");
        if(!user2){
            return res.status(404).json({success:false,token:"user not found"}); 
        }
        req.user = user2;
        next();
    } catch (error) {
        console.log("error in protectRoute middleware : ",error.message);
        return res.status(5000).json({success:false,message:"internal server"})
    }
 }