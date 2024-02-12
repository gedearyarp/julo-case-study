import express from 'express';
import helmet from 'helmet';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';

import init from './init';
import { PORT } from './config';

async function setupRoutes(app) {
    const {
        healthcheckController,
    } = await init();

    app.use('/healthcheck', healthcheckController.getRouter());
}

export async function setupMiddleware(app) {
    app.use(helmet());
    app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(httpContext.middleware);
}

export async function createApp() {
    const app = express();
    app.disable('x-powered-by');
    app.set('port', PORT);

    await setupMiddleware(app);
    await setupRoutes(app);

    return app;
}
