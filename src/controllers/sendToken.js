if (typeof module !== 'undefined') {
  // Use var here because const/let are block-scoped to the if statement.
}
const connectXrp = require('xrpl');
require('dotenv').config();

const { HOT_WALLET_SEED, COLD_WALLET_SEED, XRP_RPC_KEY } = process.env;

// Connect ---------------------------------------------------------------------
async function main(tokenName, wallet_address, tokenQty) {
  const client = new connectXrp.Client(XRP_RPC_KEY);
  await client.connect();

  // Get credentials from the Testnet Faucet -----------------------------------
  const hot_wallet = connectXrp.Wallet.fromSeed(HOT_WALLET_SEED);
  const cold_wallet = connectXrp.Wallet.fromSeed(COLD_WALLET_SEED);

  // Configure issuer (cold address) settings ----------------------------------
  const cold_settings_tx = {
    TransactionType: 'AccountSet',
    Account: cold_wallet.address,
    TransferRate: 0,
    TickSize: 5,
    Domain: '6578616D706C652E636F6D', // "example.com"
    SetFlag: connectXrp.AccountSetAsfFlags.asfDefaultRipple,
    // Using tf flags, we can enable more flags in one transaction
    Flags:
      connectXrp.AccountSetTfFlags.tfDisallowXRP |
      connectXrp.AccountSetTfFlags.tfRequireDestTag,
  };

  const cst_prepared = await client.autofill(cold_settings_tx);
  const cst_signed = cold_wallet.sign(cst_prepared);
  await client.submitAndWait(cst_signed.tx_blob);

  //   Configure hot address settings --------------------------------------------

  const hot_settings_tx = {
    TransactionType: 'AccountSet',
    Account: hot_wallet.address,
    Domain: '6578616D706C652E636F6D', // "example.com"
    // enable Require Auth so we can't use trust lines that users
    // make to the hot address, even by accident:
    SetFlag: connectXrp.AccountSetAsfFlags.asfRequireAuth,
    Flags:
      connectXrp.AccountSetTfFlags.tfDisallowXRP |
      connectXrp.AccountSetTfFlags.tfRequireDestTag,
  };

  const hst_prepared = await client.autofill(hot_settings_tx);
  const hst_signed = hot_wallet.sign(hst_prepared);
  await client.submitAndWait(hst_signed.tx_blob);

  // We will take this value from Postman
  const currency_code = tokenName;
  const issue_quantity = tokenQty;
  const receiver_address = wallet_address;

  // Send token ----------------------------------------------------------------
  const send_token_tx = {
    TransactionType: 'Payment',
    Account: cold_wallet.address,
    Amount: {
      currency: currency_code,
      value: issue_quantity,
      issuer: cold_wallet.address, // token will be issue from cold address
    },
    Destination: receiver_address, // token will received to this address
    DestinationTag: 1, // Needed since we enabled Require Destination Tags
    // on the hot account earlier.
  };

  const pay_prepared = await client.autofill(send_token_tx);
  const pay_signed = cold_wallet.sign(pay_prepared);
  await client.submitAndWait(pay_signed.tx_blob);

  client.disconnect();
}

module.exports = main;
