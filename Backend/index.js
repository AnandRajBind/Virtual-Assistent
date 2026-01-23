import express from 'express';
import dotenv from 'dotenv';
import db_Connection from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();
const PORT=process.env.PORT || 30000;


// middlewares
app.use(express.json());
app.use(cookieParser());//Reads cookies from request
app.use("/api/auth",authRouter);//Registers authentication routes. Acts as a route prefix

app.listen(PORT, async ()=>{
    await db_Connection();
    console.log(`Server is running on port ${PORT}`);
})