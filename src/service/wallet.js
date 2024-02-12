import { startSession } from 'mongoose';
import StandardError from '../util/standard-error.js';
import { EWalletStatus } from '../domain/wallet.js';
import { ETransactionStatus, ETransactionType } from '../domain/transaction.js';

export default class WalletService {
    constructor(walletRepo, transactionRepo) {
        this.walletRepo = walletRepo;
        this.transactionRepo = transactionRepo;
    }

    async enableWallet(customerXid) {
        const oldWallet = await this.walletRepo.findOne({ owned_by: customerXid });
        if (oldWallet.status === EWalletStatus.ENABLED) throw new StandardError(400, 'Already enabled');

        await this.walletRepo.updateOne(
            { owned_by: customerXid },
            { status: EWalletStatus.ENABLED, enabled_at: new Date() },
        );
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
        await this.walletRepo.updateOne(
            { owned_by: customerXid },
            { status: EWalletStatus.DISABLED, disabled_at: new Date() },
        );
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

        const transaction = await this.transactionRepo.find({ wallet_id: wallet.id });
        return transaction.map((t) => ({
            id: t.id,
            status: t.status,
            transacted_at: t.transacted_at,
            type: t.type,
            amount: t.amount,
            reference_id: t.reference_id,
        }));
    }

    async deposit(customerXid, amount, referenceId) {
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });
        await this.checkWalletActive(customerXid);
        await this.validateReferenceId(referenceId);

        await this.depositTransaction(wallet, amount, referenceId);

        const transaction = await this.transactionRepo.findOne({ reference_id: referenceId });
        return {
            id: transaction.id,
            deposited_by: wallet.owned_by,
            status: transaction.status,
            deposited_at: transaction.transacted_at,
            amount: transaction.amount,
            reference_id: transaction.reference_id,
        };
    }

    async depositTransaction(wallet, amount, referenceId) {
        const session = await startSession();
        session.startTransaction();

        try {
            await this.changeBalance(wallet, wallet.balance + amount);
            await this.addTransaction(
                wallet,
                amount,
                referenceId,
                ETransactionStatus.SUCCESS,
                ETransactionType.DEPOSIT,
            );

            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
            await this.addTransaction(
                wallet,
                amount,
                referenceId,
                ETransactionStatus.FAILED,
                ETransactionType.DEPOSIT,
            );

            session.endSession();
            throw err;
        }

        session.endSession();
    }

    async withdraw(customerXid, amount, referenceId) {
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });
        await this.checkWalletActive(customerXid);
        await this.validateReferenceId(referenceId);

        await this.withdrawTransaction(wallet, amount, referenceId);

        const transaction = await this.transactionRepo.findOne({ reference_id: referenceId });
        return {
            id: transaction.id,
            withdrawn_by: wallet.owned_by,
            status: transaction.status,
            withdrawn_at: transaction.transacted_at,
            amount: transaction.amount,
            reference_id: transaction.reference_id,
        };
    }

    async withdrawTransaction(wallet, amount, referenceId) {
        const session = await startSession();
        session.startTransaction();

        try {
            if (wallet.balance < amount) throw new StandardError(400, 'Insufficient balance');
            await this.changeBalance(wallet, wallet.balance - amount);
            await this.addTransaction(
                wallet,
                amount,
                referenceId,
                ETransactionStatus.SUCCESS,
                ETransactionType.WITHDRAWAL,
            );

            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
            await this.addTransaction(
                wallet,
                amount,
                referenceId,
                ETransactionStatus.FAILED,
                ETransactionType.WITHDRAWAL,
            );

            session.endSession();
            throw err;
        }

        session.endSession();
    }

    async changeBalance(wallet, newBalance) {
        const customerXid = wallet.owned_by;

        await this.walletRepo.updateOne(
            { owned_by: customerXid },
            { balance: newBalance },
        );
    }

    async addTransaction(wallet, amount, referenceId, transactionStatus, type) {
        const newTransaction = {
            wallet_id: wallet.id,
            status: transactionStatus,
            transacted_at: new Date(),
            type,
            amount,
            reference_id: referenceId,
        };

        await this.transactionRepo.create(newTransaction);
    }

    async validateReferenceId(referenceId) {
        const transaction = await this.transactionRepo.findOne({ reference_id: referenceId });
        if (transaction) throw new StandardError(400, 'Reference ID already exists');
    }

    async checkWalletActive(customerXid) {
        const wallet = await this.walletRepo.findOne({ owned_by: customerXid });

        if (wallet.status !== EWalletStatus.ENABLED) throw new StandardError(400, 'Wallet disabled');
        return true;
    }
}
