const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    owned_by: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, default: 'disabled' },
    enabled_at: { type: Date, default: null },
    balance: { type: Number, default: 0 },
    transactions: { type: Array, default: [] },
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
