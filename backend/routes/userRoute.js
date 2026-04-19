import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

// Register route
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

// Get profile route
userRouter.get('/get-profile', authUser, getProfile);

// Update profile route: Ensure the image is uploaded first, then auth is checked.
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);

export default userRouter;
