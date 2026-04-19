import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'

import alumniModel from "../models/alumniModel.js"
import eventsModel from '../models/eventsModel.js'
import galleryModel from '../models/galleryModel.js'

// ====================== ADD ALUMNI ======================
const addAlumni = async (req, res) => {
  try {
    const { name, email, batches, degree, place, act, cgpa, linkedin, ug, project } = req.body
    const imageFile = req.file

    if (!name || !email || !batches || !degree || !place || !act || !cgpa || !ug) {
      return res.json({ success: false, message: "Missing Details" })
    }
    const safeLinkedin = linkedin || "";

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid Email" })
    }

    // Image upload to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageUrl = imageUpload.secure_url

    const alumniData = {
      name,
      email,
      image: imageUrl,
      batches,
      ug,
      place,
      degree,
      act,
      cgpa,
      linkedin,
      project,
      date: Date.now()
    }

    const newAlumni = new alumniModel(alumniData)
    await newAlumni.save()

    res.json({ success: true, message: "Alumni added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ====================== ADMIN LOGIN ======================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid Credentials" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ====================== GET ALL ALUMNI ======================
const allAlumni = async (req, res) => {
  try {
    const alumni = await alumniModel.find({}).select('-password')
    res.json({ success: true, alumni })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// ====================== ADD EVENTS ======================
const addEvents = async (req, res) => {
  try {
    const { title, date, time, venue, description } = req.body
    const imageFile = req.file

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Event image is required" })
    }

    const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    })

    const imageUrl = uploadedImage.secure_url

    const newEvent = new eventsModel({
      title,
      date,
      time,
      venue,
      description,
      evimage: imageUrl,
    })

    await newEvent.save()
    res.status(201).json({ success: true, message: "Event added successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// ====================== GET ALL EVENTS ======================
const allEvents = async (req, res) => {
  try {
    const events = await eventsModel.find({});
    res.json({ success: true, events });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ====================== ADD GALLERY IMAGE ======================
const addGallery = async (req, res) => {
  try {
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Gallery image is required" });
    }

    const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = uploadedImage.secure_url;

    const newGallery = new galleryModel({ gelimage: imageUrl }); 
    await newGallery.save();

    res.status(201).json({ success: true, message: "Image added to gallery" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== GET ALL GALLERY IMAGES ======================
const allGallery = async (req, res) => {
  try {
    const gallery = await galleryModel.find({});
    res.json({ success: true, gallery });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addAlumni,
  loginAdmin,
  allAlumni,
  addEvents,
  allEvents,
  addGallery,
  allGallery
}
