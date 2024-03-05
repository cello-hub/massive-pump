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

const mnemonic = process.env.MNEMONIC || ''

const accounts = generateAccounts(mnemonic, 100)

const main = async () => {
  const start = 1
  for (let i = start; i < accounts.length; i++) {
    console.log(`index=${i}------------------`)

    await depositToCex({
      account: accounts[i],
      chain: opBNB,
      rpc: 'https://opbnb-mainnet-rpc.bnbchain.org',
      target: '0x156a909b045c3a31bf2a7e4554b7e458be869dc9',
      value: parseEther('0.0097')
    })
  }
}

main()
