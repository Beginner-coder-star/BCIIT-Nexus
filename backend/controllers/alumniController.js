import alumniModel from "../models/alumniModel.js";

const alumniList = async (req, res) => {
  try {
    const alumni = await alumniModel.find({}).select("-password");
    res.json({ success: true, alumni });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { alumniList };
