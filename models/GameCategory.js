const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const SchemaGameCategory =Schema({
    gameName:{
        type: String,
        require: true
    },
    gameImage:{
        type: String,
        require:true
    },
    fullDetail:{
        type:String,
        require:true
    },
    imageDetail:{
        type:String,
        require:true
    }
})

module.exports =mongoose.model('categoryGame',SchemaGameCategory);