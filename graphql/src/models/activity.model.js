import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String
  },
  days:{
    type: Object
  },
  startFrom:{
    type:String
  },
  startTo:{
    type:String
  },
  duration:{
    type:String
  },
  locations: {
    type: Object,
  },
  company: {
    type: String,
  },
  options: {
    type: Object,
  },
  status: {
    type: String,
  },
});
const activityModel = mongoose.model('activity', activitySchema);

export default activityModel;