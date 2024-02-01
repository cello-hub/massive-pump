import { generateAccounts } from '@/accouts'
import type { Address } from 'viem'
import { bsc, opBNB } from 'viem/chains'

export const singInChain = opBNB
export const claimChain = bsc

// 助记词 见 .env MNEMONIC
export const mnemonic = process.env.MNEMONIC || ''

// 合约地址
export const contractAddress: Address =
  '0xB342e7D33b806544609370271A8D074313B7bc30'

// opbnb rpc链接
export const rpc = 'https://opbnb-mainnet-rpc.bnbchain.org'

// bnb rpc
export const bnbRpc = 'https://rpc.ankr.com/bsc'

// 邀请码 - 可选
export const inviteCode = 'W2TXwfXF'

// 参与的钱包数量
export const involveAccountCount = 100

// 生成的钱包
export const accounts = generateAccounts(mnemonic, involveAccountCount)
