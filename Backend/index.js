import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import db_Connection from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import geminiResponse from './gemini.js';


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const PORT = process.env.PORT || 30000;


// middlewares
app.use(express.json());
app.use(cookieParser());//Reads cookies from request
app.use("/api/auth", authRouter);//Registers authentication routes. Acts as a route prefix
app.use("/api/user", userRouter);//Registers user routes. Acts as a route prefix

app.get('/', async (req, res) => {
    try {
        let prompt = req.query.prompt;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        let data = await geminiResponse(prompt);
        res.json(data);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to get response from Gemini', 
            details: error.message 
        });
    }
});

app.listen(PORT, async () => {
    await db_Connection();
    console.log(`Server is running on port ${PORT}`);
})