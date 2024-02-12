import express from 'express';
import helmet from 'helmet';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';

import init from './init.js';
import { PORT } from './util/config.js';
import validateToken from './middleware/validate-token.js';

async function setupRoutes(app) {
    const {
        healthcheckController,
        createWalletController,
        walletController,
    } = await init();

    app.use('/healthcheck', healthcheckController.getRouter());
    app.use('/api/v1/init', createWalletController.getRouter());
    app.use('/api/v1/wallet', validateToken, walletController.getRouter());
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
