import HealthcheckService from './service/healthcheck';
import HealthcheckController from './controller/healthcheck';

export default async function init() {
    const healthcheckService = HealthcheckService();

    const healthcheckController = HealthcheckController(healthcheckService);

    return {
        healthcheckController,
    };
}
