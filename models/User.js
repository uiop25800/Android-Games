const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const SchemaUser =Schema({
    userName:{
        type: String,
        require: true
    },
    userPassword:{
        type: String,
        require: true
    },
    tokenUserInfo:{
        type: String,
        require:true
    }
})

module.exports =mongoose.model('user',SchemaUser);