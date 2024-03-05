import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  type Account,
  type Address,
  type Chain
} from 'viem'
import { generateAccounts } from './generateAccounts'
import { opBNB } from 'viem/chains'

/**
 * 交易所充值
 */
export const depositToCex = async ({
  account,
  chain,
  rpc,
  target,
  value
}: {
  account: Account
  chain: Chain
  rpc: string
  target: Address
  value: bigint
}) => {
  const publicClient = createPublicClient({
    chain,
    transport: http(rpc)
  })

  const walletClient = createWalletClient({
    chain,
    account,
    transport: http(rpc)
  })

  const hash = await walletClient.sendTransaction({
    to: target,
    value
  })

  console.log(`${account.address} 充值交易hash: `, hash)

  await publicClient
    .waitForTransactionReceipt({
      hash
    })
    .then(async () => {
      console.log(`${account.address} 充值交易成功`)
    })
}
