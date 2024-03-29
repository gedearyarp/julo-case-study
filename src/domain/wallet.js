import mongoose from 'mongoose';

export const EWalletStatus = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
};

const walletSchema = new mongoose.Schema({
    owned_by: { type: String, required: true, unique: true },
    status: { type: String, default: 'disabled' },
    enabled_at: { type: Date, default: null },
    disabled_at: { type: Date, default: null },
    balance: { type: Number, default: 0 },
});

const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;
