import express from 'express';
import Post from '../mongodb/models/Post.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

const router = express.Router();
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        // using param id of thre object is found
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
})

// Create a post
router.post("/", async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(200).json({ success: true, data: newPost });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }

})

export default router;