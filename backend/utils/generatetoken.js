import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js";
export const generateTokensetCookie = (userId,res)=>{
    const token = jwt.sign({userId},ENV_VARS.JWT_SCERET,{expiresIn:"15d"});
    res.cookie("jwt-netflix",token,{
        maxAge:15*24*60*60*1000, //15days in milliseconds
        httpOnly:true, // it is used to prevent the xss attacks cross-site scripting attacks,make it not access by js
        sameSite:"strict", //csrf attacks cross site requests forgery attacks
        secure:ENV_VARS.NODE_ENV !== "development",
    });
    return token;
}
