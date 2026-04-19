import express from 'express';
import { eventsList } from '../controllers/eventsController.js';
import Event from '../models/eventsModel.js';

const router = express.Router();

// Route to get all events
router.get('/list', eventsList);

// ✅ Route to get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
