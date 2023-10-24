import createHttpError from "http-errors";
import validator from "validator";
import {UserModel} from "../models/index.js"
import { generateToken } from "./token.service.js";
import bcrypt from 'bcrypt';

const {DEFAULT_PICTURE,DEFAULT_STATUS} = process.env;

export const createUser = async(userData)=>{
    const {name,email,picture,status,password } = userData;
    if(!name || !email || !password){
        throw createHttpError.BadRequest("Please fill all required fields");
    }

    if(!validator.isLength(name,{
        min:2,
        max:16
    })){
        throw createHttpError.BadRequest("Name should be between 2 - 16 characters");
    }

    if(status && status.length>64){
        throw createHttpError.BadRequest("Invalid Status");
    }

    if(!validator.isEmail(email)){
        throw createHttpError.BadRequest("Invalid Email");
    }

    const checkDb = await UserModel.findOne({email});
    if(checkDb){
        throw createHttpError.BadRequest("Email already in use");

    }

    if(!validator.isLength(password,{
        min:6,
        max:128
    })){
        throw createHttpError.BadRequest("Password should be between 6 - 128 characters");

    }

    const user = await UserModel({
        name,
        email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS,
        password
    }).save();

    return user;
    
};


export const signUser = async(email,password) =>{
    const user = await UserModel.findOne({email:email.toLowerCase()}).lean();
    if(!user){
        throw createHttpError.NotFound("Invalid credentials");
    }
    let passwordMatches = await bcrypt.compare(password,user.password);
    if(!passwordMatches) throw createHttpError.NotFound("Invalid Credentials");
    return user;
};