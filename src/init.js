import dbConnect from './util/db-connect.js';
import Wallet from './domain/wallet.js';

import HealthcheckService from './service/healthcheck.js';
import CreateWalletService from './service/create-wallet.js';

import HealthcheckController from './controller/healthcheck.js';
import CreateWalletController from './controller/create-wallet.js';

export default async function init() {
    await dbConnect();

    const walletRepo = Wallet;

    const healthcheckService = new HealthcheckService();
    const createWalletService = new CreateWalletService(walletRepo);

    const healthcheckController = new HealthcheckController(healthcheckService);
    const createWalletController = new CreateWalletController(createWalletService);

    return {
        healthcheckController,
        createWalletController,
    };
}
