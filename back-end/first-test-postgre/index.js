import express from 'express';
import mongoose, { mongo } from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}))
app.use('/api', router)

app.listen(PORT, () => console.log('Server started at port: ' + PORT));

