const xrpl = require('xrpl');

async function createWallet() {
  const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');

  await client.connect();

  const wallet = await client.fundWallet();

  client.disconnect();

  const wallet_address = wallet.wallet.address;
  const wallet_seed = wallet.wallet.seed;

  return { wallet_address, wallet_seed };
}

// createWallet();

module.exports = createWallet;
