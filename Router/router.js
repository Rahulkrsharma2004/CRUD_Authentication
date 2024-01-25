const express = require("express")
const {UserModel} = require("../Models/model")
const {auth} = require("../Middleware/middleware")
const userRouter = express.Router()
const  jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config()

const secretKey = process.env.SECRET_TOKEN

userRouter.post("/register",async(req,res)=>{
    try {
        const user = new UserModel(req.body)
        await user.save()
        res.status(200).send({"msg":"New user has been created"})
    } catch (error) {
        res.status(400).send({"msg":error})   
    }



})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body

    try {
        const user = await UserModel.findOne({email,pass})
        if(user){
            const token = jwt.sign({ assignment: 'auth-todos'}, secretKey ,{ expiresIn: '1h' });
            res.status(200).send({"msg":"Login Successful",token})
        }
        else{
            res.status(200).send({"msg":"Register first or Wrong crendential"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

module.exports={
    userRouter
};




