import express from 'express';
import { eventsList } from '../controllers/eventsController.js';
import { galleryList } from '../controllers/galleryController.js';

const publicRouter = express.Router();

// Public GET routes for events and gallery
publicRouter.get('/events/list', eventsList);
publicRouter.get('/gallery/list', galleryList);

export default publicRouter;
