import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import userModel, { userRoles } from '../../DB/models/user.model.js';


//=========sign up=============

export const signUp = async(req, res, next) =>{
    
    const {name, email, password,cPassword, role} = req.body;
  

    if (await userModel.findOne({email})){
        throw new Error("user already exists", {cause:409})
    }

    const hash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)
    
    const user = await userModel.create({
        name,
        email,
        password: hash,
        role
    });
    return res.status(201).json({message: " user created successfully ", user})
}


//================sign in ===============

export const signIn = async(req, res, next) =>{

        //find email
    const {email, password} = req.body;
    const user = await userModel.findOne({email})
       if (!user){
             { throw new Error("email not found", {cause: 404})}

       }

       //compare password
    const match = bcrypt.compareSync(password, user.password)
   
    if (!match){
         { throw new Error("invalid password", {cause: 400})}
    }

    //create token
    const access_token = jwt.sign({id: user._id, email}, 
      user.role == userRoles.user? process.env.ACCESS_TOKEN_USER: process.env.ACCESS_TOKEN_ADMIN, 
      {expiresIn: "1h"} )

    const refresh_token = jwt.sign({id: user._id, email}, 
        user.role == userRoles.user? process.env.REFRESH_TOKEN_USER : process.env.REFRESH_TOKEN_ADMIN,
         {expiresIn: "1y"} )
    
     return res.status(201).json({message: "successfully logged in", access_token, refresh_token})


}

//====================get user ==========================

export const getProfile = async (req, res, next) => {

    return res.status(200).json({ message: "success", user: req.user });
};