import { stadiumsRepository } from '../repositories/index.repositories.js';

const getStadiums = async () => {
    const result = await stadiumsRepository.getStadiums({});
    return { status: 'success', result };
};

const getStadium = async (sid) => {
    const result = await stadiumsRepository.getStadium({ _id: sid });
    return { status: 'success', result };
};

export { getStadiums, getStadium };