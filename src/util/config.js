import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || '3000';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'test_jwt';
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/julo-case-study';
