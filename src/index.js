const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const userRouter = require('./routes/sendToken');
const walletRouter = require('./routes/createWallet');
const sendTokenRouter = require('./routes/sendCustomToken');

// Built in JSON Middleware
app.use(express.json());

// routes
app.post('/user', userRouter);

app.post('/wallet', walletRouter);

app.post('/sendToken', sendTokenRouter);

app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
