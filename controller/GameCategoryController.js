
const upload =require('../middleware/imgurUpload');
const GameCategory =require('../models/GameCategory');

class GamesCategoryController{
    // /api/categoryGame/postGame
    async postGame(req,res){
        const GameName =req.body.gameName;
        const GameImage =req.body.gameImage;
        const FullDetail =req.body.fullDetail;
        const ImageDetail =req.body.imageDetail;

        try {
            if(!GameName || !GameImage || !FullDetail || !ImageDetail){
                return res.json({success: false, message: 'Thiếu dữ liệu cần thiết !!'+GameName+"/"+GameImage+"/"+FullDetail+"/"+ImageDetail});
            }else{
                const LinkGameImage =await upload.UploadFile(GameImage);
                const LinkImageDetail=await upload.UploadFile(ImageDetail);
                if(!LinkGameImage=="" && !LinkImageDetail ==""){
                    const newGame =new GameCategory({gameName:GameName,gameImage:LinkGameImage,fullDetail:FullDetail,imageDetail:LinkImageDetail});
                    await newGame.save();
                    return res.json({success: true, message: 'Thêm thành công !!'+LinkGameImage+" and "+LinkImageDetail})
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: 'Lỗi !!'});
        }
    }
}

module.exports=new GamesCategoryController;