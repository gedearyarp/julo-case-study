import mongoose from 'mongoose';

export const ETransactionStatus = {
    SUCCESS: 'success',
    FAILED: 'failed',
};

export const ETransactionType = {
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
};

const transactionSchema = new mongoose.Schema({
    wallet_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Wallet' },
    status: { type: String, required: true },
    transacted_at: { type: Date, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    reference_id: { type: String, required: true, unique: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
