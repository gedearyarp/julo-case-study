import { generateToken } from '../util/jwt.js';

export default class CreateWalletService {
    constructor(walletRepo) {
        this.walletRepo = walletRepo;
    }

    async checkWalletExists(customerXid) {
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });

        return wallet;
    }

    async createWallet(customerXid) {
        const token = generateToken({ customer_xid: customerXid });
        if (await this.checkWalletExists(customerXid)) return token;

        this.walletRepo.create({ owned_by: customerXid });

        return token;
    }
}
