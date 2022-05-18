
const uploadToImgur =require('../middleware/imgurUpload');
const GameCategory =require('../models/GameCategory');
const express = require("express");
const router = express.Router();
const multer = require("multer");

const StorageImage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const uploadLocal = multer({ storage: StorageImage });

const upload = uploadLocal.fields([
    { name: "gameImage", maxCount: 1 },
    { name: "imageDetail", maxCount: 1 }
]);

router.post("/postGame", upload, async (req, res) => {
    try {
        console.log(req.files["gameImage"][0]);
        console.log(req.files["imageDetail"][0]);

        const GameName = req.body.gameName.trim();
        const GameImage = req.files["gameImage"][0].path;
        const FullDetail = req.body.fullDetail.trim();
        const ImageDetail = req.files["imageDetail"][0].path;

      if (!GameName || !GameImage || !FullDetail || !ImageDetail) {
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

router.get("/getAllGame", async (req,res)=>{
    try {
      const listAllGame = await GameCategory.find();
      return res.json({ success: true, listAllGame });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "Error !!" });
    }
});

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

router.put("/updateGameById", async (req,res)=>{
    try {
      const upIdGame = req.body.idGame;
      const upGameName = req.body.gameName;
      const upGameImage = req.body.gameImage;
      const upFullDetail = req.body.fullDetail;
      const upImageDetail = req.body.imageDetail;
      if (!upIdGame) {
        return res.json({ success: false, message: "Missing Data !!" });
      }
      const upResultGame = await GameCategory.findById(upIdGame);
      var flag = false;
      if (upResultGame.GameName != upGameName) {
        await GameCategory.findByIdAndUpdate(upIdGame, {
          gameName: upGameName.trim(),
        });
        flag = true;
      }
      if (upResultGame.FullDetail != upFullDetail) {
        await GameCategory.findByIdAndUpdate(upIdGame, {
          fullDetail: upFullDetail.trim(),
        });
        flag = true;
      }
      if (upGameImage && !upGameImage == "") {
        const upLinkGameImage = await upload.UploadFile(upGameImage);
        await GameCategory.findByIdAndUpdate(upIdGame, {
          gameImage: upLinkGameImage.trim(),
        });
        flag = true;
      }
      if (upImageDetail && !upImageDetail == "") {
        const upLinkImageDetail = await upload.UploadFile(upImageDetail);
        await GameCategory.findByIdAndUpdate(upIdGame, {
          imageDetail: upLinkImageDetail.trim(),
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