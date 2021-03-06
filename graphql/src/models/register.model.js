import mongoose from "mongoose";
const latLng = {
  lat: String,
  lng: String,
};
const registerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
  },
  activity: {
    type: String,
  },
  employee: {
    type: String,
  },
  company: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  delay: {
    type: Number,
  },
  location: {
    type: latLng,
  },
  inPosition: {
    type: Boolean,
  },
  _employee: {
    type: Object,
  },
  status: {
    type: String,
  },
});
const registerModel = mongoose.model("register", registerSchema);

export default registerModel;
