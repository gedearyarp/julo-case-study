import HealthcheckService from './service/healthcheck.js';
import HealthcheckController from './controller/healthcheck.js';
import dbConnect from './db-connect.js';

export default async function init() {
    await dbConnect();

    const healthcheckService = new HealthcheckService();

    const healthcheckController = new HealthcheckController(healthcheckService);

    return {
        healthcheckController,
    };
}
