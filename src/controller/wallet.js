import { Router } from 'express';

import { body, validationResult } from 'express-validator';
import handleAsync from '../middleware/handle-async.js';

export default class WalletController {
    constructor(walletService) {
        this.walletService = walletService;

        this.router = Router();
        this.router.post(
            '/',
            handleAsync(this.enableWallet.bind(this)),
        );
        this.router.patch(
            '/',
            handleAsync(this.disableWallet.bind(this)),
        );
        this.router.get(
            '/',
            handleAsync(this.viewBalance.bind(this)),
        );
        this.router.get(
            '/transactions',
            handleAsync(this.viewTransactions.bind(this)),
        );
    }

    getRouter() {
        return this.router;
    }

    async enableWallet(req, res) {
        const { customerXid } = req.decoded;
        const wallet = await this.walletService.enableWallet(customerXid);
        return res.status(200).json({ status: 'success', data: { wallet } });
    }

    async disableWallet(req, res) {
        const { customerXid } = req.decoded;
        const wallet = await this.walletService.disableWallet(customerXid);
        return res.status(200).json({ status: 'success', data: { wallet } });
    }

    async viewBalance(req, res) {
        const { customerXid } = req.decoded;
        const wallet = await this.walletService.viewBalance(customerXid);
        return res.status(200).json({ status: 'success', data: { wallet } });
    }

    async viewTransactions(req, res) {
        const { customerXid } = req.decoded;
        const transactions = await this.walletService.viewTransactions(customerXid);
        return res.status(200).json({ status: 'success', data: { transactions } });
    }
}
