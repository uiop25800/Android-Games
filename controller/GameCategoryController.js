
const upload =require('../middleware/imgurUpload');
const GameCategory =require('../models/GameCategory');

class GamesCategoryController{
    // /api/categoryGame/postGame
    async postGame(req,res){
        const GameName =req.body.gameName.trim();
        const GameImage =req.body.gameImage;
        const FullDetail =req.body.fullDetail.trim();
        const ImageDetail =req.body.imageDetail;

        try {
            if(!GameName || !GameImage || !FullDetail || !ImageDetail){
                return res.json({success: false, message: 'Thiếu dữ liệu cần thiết !!'});
            }else{
                const findGameName =await GameCategory.findOne({gameName: GameName});
                if(findGameName){
                    return res.json({success: false, message: 'Tên game đã tồn tại'})
                }
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
            return res.json({success: false, message: 'Lỗi !!'});
        }
    }

    async getAllGame(req,res){
        try {
            const listAllGame =await GameCategory.find();
            return res.json({success: true,listAllGame});
        } catch (error) {
            console.log(error);
            return res.json({success: false, message: 'Lỗi !!'});
        }
    }

    async getGameById(req,res){
        try {
            const IdGame =req.body.idGame;
            if(!IdGame){
                return res.json({success: false, message: 'Thiếu dữ liệu cần thiết !!'});
            }
            const ResultGameById = await GameCategory.findById(IdGame);
            return res.json({success:true,ResultGameById});
        } catch (error) {
            console.log(error);
            return res.json({success: false, message: 'Lỗi !!'});
        }
    }

    async updateGameById(req,res){
        try {
            const upIdGame =req.body.idGame;
            const upGameName =req.body.gameName;
            const upGameImage =req.body.gameImage;
            const upFullDetail =req.body.fullDetail;
            const upImageDetail =req.body.imageDetail;
            if(!upIdGame){
                return res.json({success: false, message: 'Thiếu dữ liệu cần thiết !!'});
            }
            const upResultGame = await GameCategory.findById(upIdGame);
            var flag =false;
            if(upResultGame.GameName != upGameName){
                await GameCategory.findByIdAndUpdate(upIdGame,{gameName:upGameName.trim()});
                flag =true;
            }
            if(upResultGame.FullDetail != upFullDetail){
                await GameCategory.findByIdAndUpdate(upIdGame,{fullDetail:upFullDetail.trim()});
                flag =true;
            }
            if(upGameImage && !upGameImage==""){
                const upLinkGameImage =await upload.UploadFile(upGameImage);
                await GameCategory.findByIdAndUpdate(upIdGame,{gameImage:upLinkGameImage.trim()});
                flag =true;
            }
            if(upImageDetail && !upImageDetail==""){
                const upLinkImageDetail =await upload.UploadFile(upImageDetail);
                await GameCategory.findByIdAndUpdate(upIdGame,{imageDetail:upLinkImageDetail.trim()});
                flag =true;
            }
            if(flag==false){
                return res.json({success: false, message: "Không có gì cần cập nhật"});
            }else{
                return res.json({success: true,message: "Cập nhật thành công"});
            }
        } catch (error) {
            console.log(error);
            return res.json({success: false, message: 'Lỗi !!'});
        }
    }

    async deleteById(req,res){
        try {
            const delIdGame =req.body.idGame;
            if(!delIdGame){
                return res.json({success: false, message: 'Thiếu dữ liệu cần thiết !!'});
            }
            await GameCategory.findByIdAndDelete(delIdGame);
            return res.json({success: true,message: "Xóa thành công"});
        } catch (error) {
            console.log(error);
            return res.json({success: false, message: 'Lỗi !!'});
        }
    }
}

module.exports=new GamesCategoryController;