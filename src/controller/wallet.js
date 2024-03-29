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
        this.router.post(
            '/deposits',
            [
                body('amount').isNumeric().notEmpty(),
                body('reference_id').isString().notEmpty(),
            ],
            handleAsync(this.deposit.bind(this)),
        );
        this.router.post(
            '/withdrawals',
            [
                body('amount').isNumeric().notEmpty(),
                body('reference_id').isString().notEmpty(),
            ],
            handleAsync(this.withdraw.bind(this)),
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

    async deposit(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { amount, reference_id } = req.body;
        const { customerXid } = req.decoded;
        const deposit = await this.walletService.deposit(customerXid, amount, reference_id);
        return res.status(200).json({ status: 'success', data: { deposit } });
    }

    async withdraw(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { amount, reference_id } = req.body;
        const { customerXid } = req.decoded;
        const withdrawal = await this.walletService.withdraw(customerXid, amount, reference_id);
        return res.status(200).json({ status: 'success', data: { withdrawal } });
    }
}
