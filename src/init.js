import dbConnect from './util/db-connect.js';
import Wallet from './domain/wallet.js';

import HealthcheckService from './service/healthcheck.js';
import CreateWalletService from './service/create-wallet.js';
import WalletService from './service/wallet.js';

import HealthcheckController from './controller/healthcheck.js';
import CreateWalletController from './controller/create-wallet.js';
import WalletController from './controller/wallet.js';
import Transaction from './domain/transaction.js';

export default async function init() {
    await dbConnect();
    const walletRepo = Wallet;
    const transactionRepo = Transaction;

    const healthcheckService = new HealthcheckService();
    const createWalletService = new CreateWalletService(walletRepo);
    const walletService = new WalletService(walletRepo, transactionRepo);

    const healthcheckController = new HealthcheckController(healthcheckService);
    const createWalletController = new CreateWalletController(createWalletService);
    const walletController = new WalletController(walletService);

    return {
        healthcheckController,
        createWalletController,
        walletController,
    };
}
