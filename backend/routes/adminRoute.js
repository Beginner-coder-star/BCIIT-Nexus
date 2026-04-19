import express from 'express';
import {
  addAlumni,
  allAlumni,
  loginAdmin,
  addEvents,
  allEvents,
  addGallery,
  allGallery
} from '../controllers/adminController.js';

import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

// ADMIN LOGIN
adminRouter.post('/login', loginAdmin);

// ALUMNI
adminRouter.post('/add-alumni', authAdmin, upload.single('image'), addAlumni);
adminRouter.post('/all-alumni', authAdmin, allAlumni);

// EVENTS
adminRouter.post('/add-events', authAdmin, upload.single('evimage'), addEvents);
adminRouter.post('/all-events', authAdmin, allEvents);

// GALLERY
adminRouter.post('/add-gallery', authAdmin, upload.single('gelimage'), addGallery);
adminRouter.get('/all-gallery',authAdmin, allGallery);

export default adminRouter;
