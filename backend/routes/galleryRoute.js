// galleryRoute.js
import express from 'express';
import galleryModel from '../models/galleryModel.js';

const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const gallery = await galleryModel.find();
    res.status(200).json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching gallery", error });
  }
});

export default router;
