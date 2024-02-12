import { Router } from 'express';

export default class HealthcheckController {
    constructor(healthcheckService) {
        this.healthcheckService = healthcheckService;
        this.router = Router();
    }

    getRouter() {
        return this.router;
    }

    static async getHealthcheckLiveness(_, res) {
        return res.status(200).json({ status: 'OK' });
    }
}
