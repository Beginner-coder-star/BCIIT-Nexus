import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    evimage: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const eventsModel = mongoose.models.events || mongoose.model('events', eventsSchema);

export default eventsModel;
