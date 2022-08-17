const mongoose = require('mongoose');

// schema for Wallet
const walletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  walletAddress: {
    type: String,
    required: true,
    minlength: 3,
  },
  walletSeed: {
    type: String,
    required: true,
    minlength: 3,
  },
});

// create new collection
const Wallet = new mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
