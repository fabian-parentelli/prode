import { apiFetch } from "../apiFetch.api.js";

const getGamesApi = async () => {
    return await apiFetch('/api/games', {
        method: 'GET',
    });
};

export { getGamesApi };