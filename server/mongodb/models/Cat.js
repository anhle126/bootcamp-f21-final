// backend Cat file 4 - located in server/mongodb/models
// schema! the format the documents in the collection have to follow

import mongoose from "mongoose";

const { Schema } = mongoose

const CatSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    isAdopted: {
        type: Boolean,
        required: true,
    }
})

export default mongoose.models.Cat ?? mongoose.model("Cat", CatSchema);