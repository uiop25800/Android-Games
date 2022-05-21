const express = require("express");
const Favorite = require("../models/Favorite");
const router = express.Router();

//http://localhost:5000/favorite/postFavorite
router.post("/postFavorite", async (req, res) => {
  try {
    const UserId = req.body.userId;
    const GameId = req.body.gameId;
    const GameName = req.body.gameName;
    const GameImage = req.body.gameImage;
    const FullDetail = req.body.fullDetail;
    const ImageDetail = req.body.imageDetail;
    const VideoYoutube = req.body.videoYoutubeId;
    if (
      !UserId ||
      !GameId ||
      !GameName ||
      !GameImage ||
      !FullDetail ||
      !ImageDetail ||
      !VideoYoutube
    ) {
      return res.json({
        success: false,
        message: "missing data !!" + UserId+"  "+GameId+"  "+GameName+"  "+GameImage+"  "+FullDetail+"  "+ImageDetail+"  "+VideoYoutube,
      });
    } else {
        const findFavoriteInUser = await Favorite.findOne({
          userId: UserId,
          gameId: GameId,
        });
        const findFavoriteInUserToGameName = await Favorite.findOne({
          userId: UserId,
          gameName: GameName,
        });
        if (findFavoriteInUser || findFavoriteInUserToGameName) {
          return res.json({
            success: false,
            message: "You has Favorite this game",
          });
        }
        const NewFavorite = new Favorite({
          userId: UserId,
          gameId: GameId,
          gameName: GameName,
          gameImage: GameImage,
          fullDetail: FullDetail,
          imageDetail: ImageDetail,
          videoYoutubeId: VideoYoutube,
        });
        NewFavorite.save();
        return res.json({
          success: true,
          message: "Add Success !!",
        });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Erorr !!" });
  }
});

//http://localhost:5000/favorite/getAllFavoriteByUserId
router.post("/getAllFavoriteByUserId", async (req, res) => {
  try {
    const UserId = req.body.userId;
    if (!UserId) {
      return res.json({
        success: false,
        message: "missing data !!" + GameImage,
      });
    } else {
      const listFavorite =await Favorite.find({ userId: UserId });
      return res.json({ success: true, listFavorite });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Erorr !!" });
  }
});

module.exports = router;
