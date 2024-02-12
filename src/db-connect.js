import Logger from 'js-logger';
import { MONGO_URL } from './config';

const mongoose = require('mongoose');

export default async function dbConnect() {
    const uri = MONGO_URL;

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => {
        Logger.info('Connected to MongoDB');
    }).catch((err) => {
        Logger.error('Error connecting to MongoDB', err);
    });
}
