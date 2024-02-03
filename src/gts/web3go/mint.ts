import { createWalletClient, http, type Account } from 'viem'
import { bsc } from 'viem/chains'
import { accounts, bscRpc, contractAddress } from './constants'
import ReikiABI from './reiki-abi'

const mint = async (account: Account) => {
  const walletClient = createWalletClient({
    account,
    chain: bsc,
    transport: http(bscRpc)
  })

  await walletClient.writeContract({
    address: contractAddress,
    abi: ReikiABI,
    functionName: 'safeMint',
    args: [account.address]
  })
}

mint(accounts[0])
