export default class CreateWalletService {
    constructor(walletRepo) {
        this.walletRepo = walletRepo;
    }

    async createWallet(customerXid) {
        return this.walletRepo.create({ owned_by: customerXid });
    }
}
