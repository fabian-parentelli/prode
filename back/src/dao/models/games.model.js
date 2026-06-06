import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const gamesCollection = 'games';

const gamesSchema = new mongoose.Schema({
    id: { type: String, required: true },
    home_team_id: { type: String },
    away_team_id: { type: String },
    home_team_placeholder: { type: String },
    away_team_placeholder: { type: String },
    home_score: { type: Number, default: 0 },
    away_score: { type: Number, default: 0 },
    home_scorers: { type: [String], default: [] },
    away_scorers: { type: [String], default: [] },
    group: { type: String },
    matchday: { type: Number, required: true },
    stadium_id: { type: String, required: true },
    date_local: { type: String, required: true },
    date_utc: { type: Date, required: true },
    finished: { type: Boolean, default: false },
    status: { type: String, default: 'notstarted' },
    type: { type: String, required: true },
});

gamesSchema.plugin(mongoosePaginate);

export const gamesModel = mongoose.model(gamesCollection, gamesSchema);