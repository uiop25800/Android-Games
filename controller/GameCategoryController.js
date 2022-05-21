
const uploadToImgur =require('../middleware/imgurUpload');
const GameCategory =require('../models/GameCategory');
const express = require("express");
const router = express.Router();

//http://localhost:5000/categoryGame/postGame
router.post("/postGame", async (req, res) => {
    try {
        const GameName = req.body.gameName.trim();
        const GameImage = req.body.gameImage;
        const FullDetail = req.body.fullDetail.trim();
        const ImageDetail = req.body.imageDetail;
        const VideoYoutube = req.body.videoYoutubeId;

      if (!GameName || !GameImage || !FullDetail || !ImageDetail || !VideoYoutube) {
        return res.json({
          success: false,
          message: "missing data !!" + GameImage,
        });
      } else {
        const findGameName = await GameCategory.findOne({ gameName: GameName });
        if (findGameName) {
          return res.json({
            success: false,
            message: "Game Name has already exists",
          });
        }
        const LinkGameImage = await uploadToImgur.UploadFile(GameImage);
        const LinkImageDetail = await uploadToImgur.UploadFile(ImageDetail);
        if (!LinkGameImage == "" && !LinkImageDetail == "") {
          const newGame = new GameCategory({
            gameName: GameName,
            gameImage: LinkGameImage,
            fullDetail: FullDetail,
            imageDetail: LinkImageDetail,
            videoYoutubeId: VideoYoutube,
          });
          await newGame.save();
          return res.json({
            success: true,
            message:
              "Add Success !!" + LinkGameImage + " and " + LinkImageDetail,
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Erorr !!" });
    }
  }
);
//http://localhost:5000/categoryGame/getAllGame
router.get("/getAllGame", async (req,res)=>{
    try {
      const listAllGame = await GameCategory.find();
      return res.json({ success: true, listAllGame });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error !!" });
    }
});
//http://localhost:5000/categoryGame/getAllGameSortByDate
router.get("/getAllGameSortByDate", async (req, res) => {
  try {
    const listAllGame = await GameCategory.find().sort({ dateToCreate :-1});
    return res.json({ success: true, listAllGame });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error !!" });
  }
});
//http://localhost:5000/categoryGame/getGameById
router.get("/getGameById", async (req,res)=>{
    try {
      const IdGame = req.body.idGame;
      if (!IdGame) {
        return res.json({ success: false, message: "Missing data !!" });
      }
      const ResultGameById = await GameCategory.findById(IdGame);
      return res.json({ success: true, ResultGameById });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error !!" });
    }
});
//http://localhost:5000/categoryGame/updateGameById
router.put("/updateGameById", async (req,res)=>{
    try {
      const upIdGame = req.body.idGame;
      const upGameName = req.body.gameName;
      const upGameImage = req.body.gameImage;
      const upFullDetail = req.body.fullDetail;
      const upImageDetail = req.body.imageDetail;
      const upVideoYoutube =req.body.videoYoutubeId;
      if (!upIdGame) {
        return res.json({ success: false, message: "Missing Data !!" });
      }
      const upResultGame = await GameCategory.findById(upIdGame);
      var flag = false;
      if (upResultGame.GameName != upGameName) {
        await GameCategory.findByIdAndUpdate(upIdGame, {
          gameName: upGameName,
        });
        flag = true;
      }
      if (upResultGame.FullDetail != upFullDetail) {
        await GameCategory.findByIdAndUpdate(upIdGame, {
          fullDetail: upFullDetail,
        });
        flag = true;
      }
      if (upGameImage && !upGameImage == "") {
        const upLinkGameImage = await upload.UploadFile(upGameImage);
        await GameCategory.findByIdAndUpdate(upIdGame, {
          gameImage: upLinkGameImage,
        });
        flag = true;
      }
      if (upImageDetail && !upImageDetail == "") {
        const upLinkImageDetail = await upload.UploadFile(upImageDetail);
        await GameCategory.findByIdAndUpdate(upIdGame, {
          imageDetail: upLinkImageDetail,
        });
        flag = true;
      }
      if(upResultGame.videoYoutubeId != upVideoYoutube){
        await GameCategory.findByIdAndUpdate(upIdGame, {
          videoYoutubeId: upVideoYoutube,
        });
        flag = true;
      }
      if (flag == false) {
        return res.json({ success: false, message: "Nothing to update" });
      } else {
        return res.json({ success: true, message: "Update Success" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error !!" });
    }
});
//http://localhost:5000/categoryGame/delGameById
router.delete("/delGameById", async (req,res)=>{
    try {
      const delIdGame = req.body.idGame;
      if (!delIdGame) {
        return res.json({ success: false, message: "Missing Data !!" });
      }
      await GameCategory.findByIdAndDelete(delIdGame);
      return res.json({ success: true, message: "Delete Success" });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error !!" });
    }
});
module.exports=router;