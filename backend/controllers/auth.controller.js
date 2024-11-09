import user from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokensetCookie } from "../utils/generatetoken.js";
export async function signup(req, res) {
    try {
        
        const { username, password, email } = req.body;
        
        if (!password || !email || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password must contain 6 characters" })
        }

        const existingUserbyemail = await user.findOne({ email: email })
        if (existingUserbyemail) {
            return res.status(400).json({ success: false, message: "email already exists" })
        }
        const existingUserbyusername = await user.findOne({ username: username })
        if (existingUserbyusername) {
            return res.status(400).json({ success: false, message: "username already exists" })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password,salt);

        const PROFILE_PICS = ["avatar1.png", "avatar2.png", "avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newuser = new user({
            email: email,
            password: hashedpassword,
            username: username,
            image: image
        });
            generateTokensetCookie(newuser._id,res);
            await newuser.save();
            res.status(200).json({
                success:true,
                message:"account created successfully",
                                user:{
                    ...newuser._doc,
                    password : "",
                },
            });

        // res.status(201).json({"message":"succesfully created user"})
    }
    catch (error) {
        console.log("Error in signup control : " + error.message);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export async function login(req, res) {
    try {
        const {email,password} = req.body;
        if(!email || !password){
          return  res.status(400).json({success:false,message:"All fields are required"});
        }
        const user1  = await user.findOne({email : email});
        
        if(!user1){
            return res.status(400).json({success:false,message:"Invalid credials"});
        }
        const isPasswordCorrect = await bcryptjs.compare(password,user1.password);
        if(!isPasswordCorrect){
           return res.status(400).json({success:false,message:"Invalid credials"});
        }
        generateTokensetCookie(user1._id,res);
        
        res.status(200).json({
            success:true,
            user:{
                ...user1._doc,
                password : "",
            },
        });
        
    } catch (error) {
        console.log("Error in login control : " + error.message);
         return res.status(500).json({ success: false, message: "Internal server error" })
        
    }
}

export async function logout(req, res) {
    try {
        
       res.clearCookie("jwt-netflix"); 
       return res.status(200).json({success:true,message:"Logedout successfully"});
    } catch (error) {
        console.log("Error in logedout controller " ,error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}


export async function authCheck(req,res) {
    try {
        res.status(200).json({success:true,user:req.user})
    } catch (error) {
        console.log("Error in auth check controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}