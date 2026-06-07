import { predictionsRepository } from '../repositories/index.repositories.js';
import { calculatePoints } from '../utils/calculatePoints.utils.js';

const getPredictions = async () => {
    const result = await predictionsRepository.getPredictions({});
    return { status: 'success', result };
};

const getUserPredictions = async (userId) => {
    const result = await predictionsRepository.getPrediction({ user: userId });
    return { status: 'success', result };
};

const savePredictions = async (userId, predictions) => {
    const doc = await predictionsRepository.getPrediction({ user: userId });
    if (!doc) {
        const result = await predictionsRepository.createPrediction({
            user: userId,
            predictions: predictions.map(p => ({ ...p, points: 0, updatedAt: new Date() })),
        });
        return { status: 'success', result };
    }
    const merged = [...doc.predictions];
    for (const p of predictions) {
        const idx = merged.findIndex(m => m.game === p.game);
        if (idx !== -1) {
            merged[idx] = { ...merged[idx], home: p.home, away: p.away, updatedAt: new Date() };
        } else {
            merged.push({ ...p, points: 0, updatedAt: new Date() });
        }
    }
    const result = await predictionsRepository.updatePrediction(
        { user: userId },
        { predictions: merged }
    );
    return { status: 'success', result };
};

const updatePoints = async (gameId, realHome, realAway) => {
    const docs = await predictionsRepository.getPredictions({ 'predictions.game': gameId });
    for (const doc of docs) {
        const updated = doc.predictions.map(p => {
            if (p.game !== gameId) return p;
            const points = calculatePoints(p.home, p.away, realHome, realAway);
            return { ...p, points };
        });
        const totalPoints = updated.reduce((sum, p) => sum + p.points, 0);
        await predictionsRepository.updatePrediction(
            { user: doc.user },
            { predictions: updated, totalPoints }
        );
    }
    return { status: 'success', message: 'Points updated' };
};

export { getPredictions, getUserPredictions, savePredictions, updatePoints };
