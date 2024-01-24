import { binanceClient } from './client'

binanceClient.fetchBalance().then((balance) => {
  console.log(balance)
})
