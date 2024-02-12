import { Router } from 'express';
import logger from '../util/logger.js';
import handleAsync from '../middleware/handle-async.js';
import StandardError from '../util/standard-error.js';

export default class HealthcheckController {
    constructor(healthcheckService) {
        this.healthcheckService = healthcheckService;

        this.router = Router();
        this.router.get(
            '/liveness',
            handleAsync(HealthcheckController.getHealthcheckLiveness),
        );
    }

    getRouter() {
        return this.router;
    }

    static async getHealthcheckLiveness(_, res) {
        return res.status(200).json({ status: 'OK', data: 'Service is healthy' });
    }
}
