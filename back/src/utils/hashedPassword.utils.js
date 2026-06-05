import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const createHash = async (password) => {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `${salt}:${derivedKey.toString('hex')}`;
};

const isValidPassword = async (user, password) => {
  const [salt, key] = user.password.split(':');
  const derivedKey = await scryptAsync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return timingSafeEqual(Buffer.from(key, 'hex'), derivedKey);
};

export { createHash, isValidPassword };