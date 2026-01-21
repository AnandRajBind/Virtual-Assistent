import express from 'express';
import dotenv from 'dotenv';
import db_Connection from './config/db.js';

dotenv.config();

const app=express();
const PORT=process.env.PORT || 30000;
 
app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(PORT, async ()=>{
    await db_Connection();
    console.log(`Server is running on port ${PORT}`);
})