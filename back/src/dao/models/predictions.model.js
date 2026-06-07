import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const predictionsCollection = 'predictions';

const predictionSchema = new mongoose.Schema({
    game: { type: String, required: true },
    home: { type: Number, required: true },
    away: { type: Number, required: true },
    points: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
});

const predictionsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
    predictions: [predictionSchema],
    totalPoints: { type: Number, default: 0 },
}, {
    timestamps: true,
});

predictionsSchema.plugin(mongoosePaginate);

export const predictionsModel = mongoose.model(predictionsCollection, predictionsSchema);