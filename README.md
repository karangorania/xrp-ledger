# XRP Ledger API

It is XRP Ledger Wallet API. You can create wallet and issue a token to different wallet.

I have use public XRP Ledger Testnet server. I am using two wallet Cold wallet & Hot wallet.
Cold wallet is use for issuing token to other Hot wallet. We have two API one more create hot wallet & second more received tokens.

## Create Wallet API - 1

This API will give you fresh Hot wallet. You have write the name. It will give you wallet address & wallet seed.

```bash
{
    "name" : "Karan J Goraniya"
}
```

## Create Wallet API - 2

Before you request you have to add custom token to your wallet. Using XRP Testnet Toolkit.

- [XRP Toolkit Testnet](https://test.xrptoolkit.com/)

- Token Address

```bash
LOX : rn2sbUWaB2iDPjuDncEUXePRwtVdafTBk3
```

```bash
SOX : rn2sbUWaB2iDPjuDncEUXePRwtVdafTBk3
```

```bash
NFX : rn2sbUWaB2iDPjuDncEUXePRwtVdafTBk3
```

After you get Wallet Address & Wallet Seed you can request your required three tokens. Before that you have to add token address manually to your wallet using XRP-Toolkit.

You have to provide four things to received tokens in your account.

- 1 Your Name
- 2 Token Name ( Only three SOX, LOX, NFX )
- 3 Your Wallet Address ( Not Seed Phrase )
- 4 Token Amount

```bash
{
    "name" : "Karan J Goraniya",
    "tokenName": "SOX",
    "wallet_address": "r9xWBX1HtaeMYytzkwKQQMWuEkAKfs5ciE",
    "tokenQty": "2000"
}
```

## For More Information

- [Refer to this Doc](https://roadtoweb3.notion.site/Docs-55affd9cfe6147b5b0402113f14c3843)

## For Developers

```bash
create .env file in root directory.
```

```bash
Add this to your .env file or you can see .env.sample file
```

```bash
HOT_WALLET_SEED = "YOUR_HOT_WALLET_SEED"
COLD_WALLET_SEED = "YOUR_COLD_WALLET_SEED"
XRP_RPC_KEY = "WEBSOCKET_RPC_KEY"
```

-Get Your Hot Wallet

- [Hot Wallet Testnet](https://xrpl.org/xrp-testnet-faucet.html)

-Get Your Hot & Cold wallet for Testnet

- [Hot & Cold Testnet](https://xrpl.org/issue-a-fungible-token.html#example-code)

-Get Your WebScoket

- You can use public client for Testnet

```bash
wss://s.altnet.rippletest.net:51233
```

## NPM Packages

- [Express](https://www.npmjs.com/package/express)
- [Xrpl](https://www.npmjs.com/package/xrpl)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Cors](https://www.npmjs.com/package/cors)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Tech Stack

- [Node](https://nodejs.org/en/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/karangorania/xrp-ledger
```

Go to the project directory

```bash
  cd xrp-ledger
```

Install dependencies

```bash
  npm install
```

Start the app

```bash
  npm start
```
