import { CustomNotFound } from '../../utils/custom-exceptions.utils.js';
import { isValidEmail, normalize } from '../validations.val.js';

const MAX_NAME_LENGTH = 50;

const postSession = (body) => {

    if (!body || typeof body !== 'object') throw new CustomNotFound('Invalid body', 'info');

    const { name, email, password, type } = body;
    const keys = Object.keys(body);

    if (!type || (type !== 'register' && type !== 'login')) {
        throw new CustomNotFound('Invalid type', 'info');
    };

    if (type === 'register') {

        if (keys.length !== 4 || !keys.includes('name') || !keys.includes('email') || !keys.includes('password') || !keys.includes('type')) {
            throw new CustomNotFound('Invalid fields for register', 'info');
        };

        if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            throw new CustomNotFound('Invalid field types', 'info');
        };

        if (!isValidEmail(email)) throw new CustomNotFound('Invalid email', 'info');

        let normalizedName = normalize(name);
        if (normalizedName.length > MAX_NAME_LENGTH) {
            normalizedName = normalizedName.slice(0, MAX_NAME_LENGTH);
        };

        return {
            name: normalizedName,
            email: normalize(email),
            password: password.trim(),
            type
        };
    };

    if (type === 'login') {

        if (keys.length !== 3 || !keys.includes('email') || !keys.includes('password') || !keys.includes('type')) {
            throw new CustomNotFound('Invalid fields for login', 'info');
        };

        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new CustomNotFound('Invalid field types', 'info');
        };

        if (!isValidEmail(email)) throw new CustomNotFound('Invalid email', 'info');        

        return {
            email: normalize(email),
            password: password.trim(),
            type
        };
    };
    
};

export { postSession };