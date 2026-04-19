import eventsModel from "../models/eventsModel.js";
const eventsList = async (req, res) => {
  try {
    const events = await eventsModel.find({});
    res.json({ success: true, events });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { eventsList };
