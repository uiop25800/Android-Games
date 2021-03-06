const express = require('express');
const cors =require('cors');
const dotenv =require('dotenv');
const mongo =require('mongoose');

const connectDB =async() => {
    try {
        await mongo.connect('mongodb+srv://thanhphong:phong2012@cluster0.2sd1b.mongodb.net/AndroidTestProject01?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log('connect Completed');
    } catch (error) {
        console.log('connect fail');
        console.log(error);
    }
}
connectDB();

const route =require('./routers/routersIndex');

const app =express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

route(app);

app.listen(PORT,()=>{
    console.log('server running at Port '+PORT);
});