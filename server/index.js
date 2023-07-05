import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use("/post", postRoutes);
app.use("/dalle", dalleRoutes);

app.get('/', (req, res) => {
    res.send("Hello from Dalle-e")
})
app.listen(8080, () => {
    connectDB(process.env.MONGO);
    console.log("connected to backend");
})
