import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './config.js';

const secretKey = JWT_SECRET_KEY;

export function generateToken(userData) {
    const token = jwt.sign(userData, secretKey, { expiresIn: '1d' });
    return token;
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
}
