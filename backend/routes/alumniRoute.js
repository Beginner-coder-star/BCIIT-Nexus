import express from 'express';
import { alumniList } from '../controllers/alumniController.js';

const alumniRouter = express.Router();
alumniRouter.get('/list', alumniList);

export default alumniRouter;
