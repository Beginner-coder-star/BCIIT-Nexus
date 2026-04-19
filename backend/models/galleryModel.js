import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    gelimage: { type: String, required: true },
  },
  { timestamps: true }
);

const galleryModel = mongoose.models.gallery || mongoose.model('gallery', gallerySchema);

export default galleryModel;
