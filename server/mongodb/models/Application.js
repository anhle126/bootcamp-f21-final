import { ObjectID } from "mongodb/node_modules/bson";
import mongoose from "mongoose";

const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  name: {
    type: String,
    required: true,
    // index: true,
    // unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  catID: {
    type: ObjectID,
    required: true,
  },
});

export default mongoose.models.Application ?? mongoose.model("Application", ApplicationSchema);
