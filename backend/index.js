import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import classRoutes from './routes/classRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'))//exposes uploads folder so that we can view images from frontend

const mongoURI = 'mongodb+srv://sarakane17:'+encodeURIComponent('JfnUL5zBmz5XPsF')+'@cluster0.ceo6ibs.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
        .then(()=> console.log('Connected to mongo db'))
        .catch((err)=>console.log(err))
 

app.use('/class', classRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Activity 
// create a router with name exampleRoutes
// add a route with path /example
// it will send hello world

app.listen(PORT, ()=>{
    console.log("Server listening on PORT: "+PORT)
});