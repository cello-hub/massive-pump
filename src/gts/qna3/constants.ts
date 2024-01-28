import { generateAccounts } from '@/accouts'
import { opBNB } from 'viem/chains'

export const chain = opBNB

// 助记词 见 .env MNEMONIC
export const mnemonic = process.env.MNEMONIC || ''

// rpc链接 见 .env OPBNB_RPC
export const rpc = process.env.OPBNB_RPC

// 邀请码
export const inviteCode = 'W2TXwfXF'

// 参与的账号数量
export const involveAccountCount = 100

export const accounts = generateAccounts(mnemonic, involveAccountCount)
