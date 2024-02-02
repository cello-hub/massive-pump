import { createWalletClient, http, type Account } from 'viem'
import { bsc } from 'viem/chains'
import { rpc } from './constants'

const mint = async (account: Account) => {
  const walletClient = createWalletClient({
    chain: bsc,
    transport: http(rpc)
  })
}
