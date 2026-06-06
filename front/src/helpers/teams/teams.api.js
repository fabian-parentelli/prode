import { apiFetch } from "../apiFetch.api.js";

const getTeamsApi = async () => {
    return await apiFetch('/api/teams', {
        method: 'GET',
    });
};

export { getTeamsApi };