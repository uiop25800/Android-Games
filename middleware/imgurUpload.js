const imgur =require('imgur-node-api');
const fs =require('fs-extra');
const cloudinary = require("cloudinary");

class Upload{
    async UploadFile(path) {
        imgur.setClientID(process.env.idClient);
        return new Promise((resolve,reject)=>{
            imgur.upload(path, async function (err, res) {
              if (!err) {
                const Link = await res.data.link;
                console.log(Link);
                resolve(Link);
              }
              await fs.remove(path);
            });
        });
    }
}

module.exports =new Upload;