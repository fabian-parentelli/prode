const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const isValidObjectId = (id) => {
    return /^[a-fA-F0-9]{24}$/.test(id);
};

const normalize = (value) => {
    return value
        .toString()
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export { isValidEmail, isValidObjectId, normalize };