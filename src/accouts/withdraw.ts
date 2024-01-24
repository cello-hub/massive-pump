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
export const withdrawFromAssetAccount = async (
  chain: Chain,
  rpc: string,
  target: Address,
  value: bigint
) => {
  if (!process.env.ASSET_ACCOUNT_SECRET) {
    throw new Error('ASSET_ACCOUNT_SECRET is not set in .env file')
  }

  const secret = process.env.ASSET_ACCOUNT_SECRET as Address
  const account = privateKeyToAccount(secret)

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

// 从 okx 提币 (地址需要在白单中)
export const withdrawFromOkx = async (
  address: Address,
  ccy: string,
  amount: number,
  params: any = {
    pwd: '-'
  },
  tags: any = ''
) => {
  return okxClient.withdraw(ccy, amount, address, tags, params)
}

// 从 binance 提币
export const withdrawFromBinance = async (
  address: Address,
  coin: string,
  amount: number,
  params: any = {},
  tags: any = ''
) => {
  return binanceClient.withdraw(coin, amount, address, tags, params)
}
