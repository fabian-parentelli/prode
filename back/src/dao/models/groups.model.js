import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const groupsCollection = 'groups';

const teamStatsSchema = new mongoose.Schema({
    team_id: { type: String, required: true },
    mp: { type: String, required: true },
    w: { type: String, required: true },
    l: { type: String, required: true },
    d: { type: String, required: true },
    pts: { type: String, required: true },
    gf: { type: String, required: true },
    ga: { type: String, required: true },
    gd: { type: String, required: true },
});

const groupsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teams: [teamStatsSchema],
});

groupsSchema.plugin(mongoosePaginate);

export const groupsModel = mongoose.model(groupsCollection, groupsSchema);
