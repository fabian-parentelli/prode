import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const stadiumsCollection = 'stadiums';

const stadiumsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    fifa_name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    capacity: { type: Number, required: true },
    region: { type: String, required: true },
    time_zone: { type: String },
});

stadiumsSchema.plugin(mongoosePaginate);

export const stadiumsModel = mongoose.model(stadiumsCollection, stadiumsSchema);