const express = require('express');
const router = express.Router();

const dbConnect = require('../db/conn');
const SendToken = require('../models/sendCustomTokens');

const sendCustomToken = require('../controllers/sendCustomTokens');

router.post('/sendToken', async (req, res) => {
  await sendCustomToken(
    req.body.tokenName,
    req.body.wallet_address,
    req.body.tokenQty
  );

  const sendToken = new SendToken({
    name: req.body.name,
    tokenName: req.body.tokenName,
    wallet_address: req.body.wallet_address,
    tokenQty: req.body.tokenQty,
  });
  await sendToken.save();
  res.send(sendToken);
});

module.exports = router;
