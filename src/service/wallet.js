import StandardError from '../util/standard-error.js';

export default class WalletService {
    constructor(walletRepo) {
        this.walletRepo = walletRepo;
    }

    async enableWallet(customerXid) {
        const oldWallet = await this.walletRepo.findOne({ owned_by: customerXid });
        if (oldWallet.status === 'enabled') throw new StandardError(400, 'Already enabled');

        await this.walletRepo.updateOne({ owned_by: customerXid }, { status: 'enabled', enabled_at: new Date() });
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });

        return {
            id: wallet.id,
            owned_by: wallet.owned_by,
            status: wallet.status,
            enabled_at: wallet.enabled_at,
            balance: wallet.balance,
        };
    }

    async disableWallet(customerXid) {
        await this.walletRepo.updateOne({ owned_by: customerXid }, { status: 'disabled', disabled_at: new Date() });
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });

        return {
            id: wallet.id,
            owned_by: wallet.owned_by,
            status: wallet.status,
            disabled_at: wallet.disabled_at,
            balance: wallet.balance,
        };
    }

    async viewBalance(customerXid) {
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });
        await this.checkWalletActive(customerXid);

        return {
            id: wallet.id,
            owned_by: wallet.owned_by,
            status: wallet.status,
            enabled_at: wallet.enabled_at,
            balance: wallet.balance,
        };
    }

    async viewTransactions(customerXid) {
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });
        await this.checkWalletActive(customerXid);

        return wallet.transactions;
    }

    async checkWalletActive(customerXid) {
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });

        if (wallet.status !== 'enabled') throw new StandardError(400, 'Wallet disabled');
        return true;
    }
}
