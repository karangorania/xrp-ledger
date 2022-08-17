const express = require('express');
const router = express.Router();

const dbConnect = require('../db/conn');
const User = require('../models/users');

const sendToken = require('../controllers/sendToken');

router.post('/user', async (req, res) => {
  await sendToken(
    req.body.tokenName,
    req.body.wallet_address,
    req.body.tokenQty
  );

  const user = new User({
    name: req.body.name,
    tokenName: req.body.tokenName,
    wallet_address: req.body.wallet_address,
    tokenQty: req.body.tokenQty,
  });
  await user.save();
  res.send(user);
});

module.exports = router;
