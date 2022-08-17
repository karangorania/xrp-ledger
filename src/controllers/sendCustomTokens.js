var connectXrp = require('xrpl');
require('dotenv').config();

const { HOT_WALLET_SEED, XRP_RPC_KEY } = process.env;

// Connect ---------------------------------------------------------------------
async function main(tokenName, wallet_address, tokenQty) {
  const client = new connectXrp.Client(XRP_RPC_KEY);

  await client.connect();

  const hot_wallet = connectXrp.Wallet.fromSeed(HOT_WALLET_SEED);

  // We will take this value from Postman
  const currency_code = tokenName;
  const issue_quantity = tokenQty;
  const receiver_address = wallet_address;
  const issuer_address = 'rn2sbUWaB2iDPjuDncEUXePRwtVdafTBk3';

  // Send token ----------------------  ------------------------------------------

  const send_token_tx = {
    TransactionType: 'Payment',
    Account: hot_wallet.address,
    Amount: {
      currency: currency_code,
      value: issue_quantity,
      issuer: issuer_address,
    },
    Destination: receiver_address,
    DestinationTag: 1, // Needed since we enabled Require Destination Tags
    // on the hot account earlier.
  };

  const pay_prepared = await client.autofill(send_token_tx);
  const pay_signed = hot_wallet.sign(pay_prepared);
  const pay_result = await client.submitAndWait(pay_signed.tx_blob);

  console.log(pay_result);

  client.disconnect();
}

// main();

module.exports = main;
