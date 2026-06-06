import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const teamsCollection = 'teams';

const teamsSchema = new mongoose.Schema({
    name_en: { type: String, required: true },
    flag: { type: String, required: true },
    fifa_code: { type: String, required: true },
    iso2: { type: String, required: true },
    groups: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
});

teamsSchema.plugin(mongoosePaginate);

export const teamsModel = mongoose.model(teamsCollection, teamsSchema);
