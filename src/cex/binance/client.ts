import ccxt from 'ccxt'

export const binanceClient = new ccxt.binance({
  apiKey: process.env.OKX_APIKEY,
  secret: process.env.OKX_SECRETKEY,
  password: process.env.OKX_PASSPHRASE
})
