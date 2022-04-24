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
    userInfo:{
        fullName:{
            type: String,
            default: "none"
        },
        email:{
            type: String,
            default: "none"
        },
        avatar:{
            type: String,
            default: "none"
        }
    }
})

module.exports =mongoose.model('user',SchemaUser);