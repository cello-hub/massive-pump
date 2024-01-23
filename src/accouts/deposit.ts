import { binanceClient } from '@/cex/binance/client'
import { okxClient } from '@/cex/okx/client'
import {
  createPublicClient,
  createWalletClient,
  http,
  type Account,
  type Address
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import type { Chain } from 'viem/chains'

// 从链上钱包转账
export const depositFromAssetAccount = async (
  chain: Chain,
  rpc: string,
  target: Address,
  value: bigint
) => {
  const account = privateKeyToAccount('0x')

  const walletClient = createWalletClient({
    chain,
    account,
    transport: http(rpc)
  })

  const publicClient = createPublicClient({
    chain,
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

// 从 okx 提币
export const depositFromOkx = async (
  account: Account,
  amount: number,
  ccy: string
) => {
  okxClient
    .withdraw(ccy, amount, account.address, '', {
      pwd: '-'
    })
    .then(() => {
      console.log(`${account.address} 充值交易hash: `)
    })
}

// 从 binance 提币
export const depositFromBinance = async (
  account: Account,
  code: string,
  amount: number
) => {
  // withdraw(code: string, amount: any, address: any, tag?: any, params?: {}): Promise<Transaction>;
  binanceClient.withdraw(code, amount, account.address, '', {}).then(() => {
    console.log(`${account.address} 充值交易hash: `)
  })
}