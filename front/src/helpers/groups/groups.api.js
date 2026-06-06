import { apiFetch } from "../apiFetch.api.js";

const getGroupsApi = async () => {
    return await apiFetch('/api/groups', {
        method: 'GET',
    });
};

export { getGroupsApi };