// backend/controllers/galleryController.js

import galleryModel from "../models/galleryModel.js";

// Add Gallery Controller
const addGallery = async (req, res) => {
  try {
    const { gelimage } = req.body;
    if (!gelimage) return res.json({ success: false, message: "Image required" });

    const newImage = new galleryModel({ gelimage });
    await newImage.save();

    res.json({ success: true, message: "Gallery image added", image: newImage });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Gallery List Controller
const galleryList = async (req, res) => {
  try {
    const gallery = await galleryModel.find({});
    res.json({ success: true, gallery });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addGallery, galleryList };
