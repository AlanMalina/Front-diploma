import express from 'express';
import mongoose, { mongo } from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const PORT = 5000;
const DB_URL = 'mongodb+srv://user1:user@cluster0.tyfgo8a.mongodb.net/'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}))
app.use('/api', router)


async function startApp(){
    try{
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Server started at port: ' + PORT));
    } catch(e){
        console.log(e);
    }
}

startApp();