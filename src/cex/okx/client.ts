import ccxt from 'ccxt'

export const okxClient = new ccxt.okx({
  apiKey: process.env.OKX_APIKEY,
  secret: process.env.OKX_SECRETKEY,
  password: process.env.OKX_PASSPHRASE
})
