import { generateAccounts } from '@/accouts'
import { opBNB } from 'viem/chains'

export const chain = opBNB

// 助记词 见 .env MNEMONIC
export const mnemonic = process.env.MNEMONIC || ''

// opbnb rpc链接
export const rpc = 'https://opbnb-mainnet-rpc.bnbchain.org'

// 邀请码 - 可选
export const inviteCode = 'W2TXwfXF'

// 参与的钱包数量
export const involveAccountCount = 100

// 生成的钱包
export const accounts = generateAccounts(mnemonic, involveAccountCount)
