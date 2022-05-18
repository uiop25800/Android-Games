
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const express = require("express");
const router = express.Router();
const User =require('../models/User');

// http://localhost:5000/user/Register
router.post("/Register", async(req,res)=>{
    try {
        const UserName = req.body.userName.trim();
        const PassWord = req.body.userPassword.trim();
        const FullName = req.body.fullName.trim();
        const Email = req.body.email.trim();
        const Avatar = "https://i.imgur.com/AChld7K.png";
      if (!UserName || !PassWord) {
        return res.json({
          success: false,
          message: "missing userName or passWord",
        });
      }
      const checkUserName = await User.findOne({ userName: UserName });
      if (checkUserName) {
        return res.json({
          success: false,
          message: "userName aldready exists",
        });
      }
      if (!FullName || !Email | !Avatar) {
        return res.json({ success: false, message: "missing part" });
      }
      bcrypt.hash(PassWord, 10, async function (error, hash) {
        if (!error) {
          const NewUser = new User({
            userName: UserName,
            userPassword: hash,
            tokenUserInfo: "",
          });
          NewUser.save();
          const acessToken = jwt.sign(
            {
              userId: NewUser._id,
              userFullName: FullName,
              userEmail: Email,
              userAvatar: Avatar,
            },
            process.env.Token_Secret
          );
          await User.findByIdAndUpdate(NewUser._id, {
            tokenUserInfo: acessToken,
          });
          return res.json({
            success: true,
            message: "Resigter success access Token is",
            acessToken,
          });
        } else {
          return res.json({ success: false, message: "Hash False" });
        }
      });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Erorr !!" });
    }
});
// http://localhost:5000/user/Login
router.post("/Login", async(req,res)=>{
    try {
      const UserName = req.body.userName.trim();
      const PassWord = req.body.userPassword.trim();
      if (!UserName || !PassWord) {
        return res.json({
          success: false,
          message: "missing userName or passWord",
        });
      }
      const user = await User.findOne({ userName: UserName });
      if (!user) {
        return res.json({ success: false, message: "wrong userName" });
      }
      const passwordVaild = await bcrypt.compare(PassWord, user.userPassword);
      if (!passwordVaild) {
        return res.json({ success: false, message: "wrong Password" });
      }
      if (user.tokenUserInfo) {
        const decode = jwt.verify(user.tokenUserInfo, process.env.Token_Secret);
        return res.json({
          success: true,
          message: "Login Success",
          data: {
            idUser: decode.userId,
            FullName: decode.userFullName,
            Email: decode.userEmail,
            Avatar: decode.userAvatar,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Erorr !!" });
    }
});

module.exports = router;