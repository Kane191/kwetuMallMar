import {model, Schema} from 'mongoose';

const pickupPointSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default model("pickupPointModel", pickupPointSchema);