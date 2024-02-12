import mongoose from 'mongoose';
import logger from './logger.js';
import { MONGO_URL } from './config.js';

export default async function dbConnect() {
    const uri = MONGO_URL;

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        logger.info('Connected to MongoDB');
    }).catch((err) => {
        logger.error('Error connecting to MongoDB', err);
    });
}
