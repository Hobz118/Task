import { asyncHandler } from "../../utils/errorHandling.js";
import {userModel} from "../../..//DB/models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



export const SignUp=asyncHandler(async(req,res,next)=>{
    const {name,email,password,gender}=req.body
    console.log(name,email,password,gender);
    
    const check=await userModel.findOne({email})
    console.log(check)
    if(check){
        console.log("email already exist");
        
        return next(new Error(`Email already exist`,{cause:400}))
    }
    const hashpass=await bcrypt.hash(password,10)
    console.log("hoooozzzzzzzzzz");
    
    console.log(hashpass);
    
    const user=await userModel.create({name,email,password:hashpass,gender})
    return res.status(201).json({mesage:"user created succesfully",user})

})

export const SignIn=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return next(new Error(`Email is not exist`,{cause:400}))
    }
    const token=await jwt.sign({id:user._id,role:user.role},process.env.TOKEN_SIGNATURE,{expiresIn:"1d"})
    const checkpass=await bcrypt.compare(password,user.password)
    if(!checkpass){
        return next(new Error(`Password is not correct`,{cause:400}))
    }
    return res.status(200).json({mesage:"user login succesfully",user,"token":token})
})


