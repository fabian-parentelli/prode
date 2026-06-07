import { apiFetch } from "../apiFetch.api.js";

const getPredictionsApi = async () => {
    return await apiFetch('/api/predictions', {
        method: 'GET',
    });
};

const getUserPredictionsApi = async (userId) => {
    return await apiFetch(`/api/predictions/${userId}`, {
        method: 'GET',
    });
};

const savePredictionsApi = async (userId, predictions) => {
    return await apiFetch('/api/predictions', {
        method: 'POST',
        body: JSON.stringify({ userId, predictions }),
    });
};

export { getPredictionsApi, getUserPredictionsApi, savePredictionsApi };
