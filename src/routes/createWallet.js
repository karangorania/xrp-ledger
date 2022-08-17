const express = require('express');
const router = express.Router();

const dbConnect = require('../db/conn');
const Wallet = require('../models/newWallet');

const createWallet = require('../controllers/createWallet');

router.post('/wallet', async (req, res) => {
  const walletData = await createWallet();

  const wallet = new Wallet({
    name: req.body.name,
    walletAddress: walletData.wallet_address,
    walletSeed: walletData.wallet_seed,
  });
  await wallet.save();
  res.send(wallet);
});

module.exports = router;
