import { apiFetch } from "../apiFetch.api.js";

const getStadiumsApi = async () => {

    return await apiFetch('/api/stadium', {
        method: 'GET',
    });

};

export { getStadiumsApi };