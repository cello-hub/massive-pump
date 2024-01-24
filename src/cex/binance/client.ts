import ccxt from 'ccxt'

export const binanceClient = new ccxt.binance({
  apiKey: process.env.BINANCE_APIKEY,
  secret: process.env.BINANCE_SECRETKEY
})
