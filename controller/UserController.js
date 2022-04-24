const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');

const User =require('../models/User');

class UserController{
    //
    async resigter(req,res){
        try {
            
        } catch (error) {
            
        }
        const UserName =req.body.userName.trim();
        const PassWord =req.body.userPassword.trim();
        const FullName =req.body.fullName.trim();
        const Email =req.body.email.trim();
        const Avatar =req.body.avatar.trim();

        if(!UserName || !PassWord){
            return res.json({success: false, message: "missing userName or passWord"});
        }
        const checkUserName = await User.findOne(UserName);
        if(checkUserName){
            return res.json({success: false, message: "userName aldready exists"});
        }
    }
}