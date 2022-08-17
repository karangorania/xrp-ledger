const mongoose = require('mongoose');

// schema for User
const sendTokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  tokenName: {
    type: String,
    required: true,
  },
  wallet_address: {
    type: String,
    required: true,
  },
  tokenQty: {
    type: String,
    required: true,
  },
});

// create new collection
const SendToken = new mongoose.model('SendToken', sendTokenSchema);

module.exports = SendToken;
