import { Router } from 'express';

import { body, validationResult } from 'express-validator';

export default class CreateWalletController {
    constructor(createWalletService) {
        this.createWalletService = createWalletService;
        this.router = Router();
        this.router.post('/', [
            body('customer_xid').isString().notEmpty(),
        ], this.createWallet.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async createWallet(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { customer_xid } = req.body;
        const wallet = await this.createWalletService.createWallet(customer_xid);
        return res.status(200).json({ wallet });
    }
}
