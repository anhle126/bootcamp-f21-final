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
    trim: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], // not sure if this works
  },
  phone: {
    type: String,
    required: true,
    match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Please fill a valid phone number'], // not sure if this works
  },
  explanation: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  catID: {
    type: ObjectID,
    required: true,
  },
});

export default mongoose.models.Application ?? mongoose.model("Application", ApplicationSchema);
