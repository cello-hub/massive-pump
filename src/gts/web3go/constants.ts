import { generateAccounts } from '@/accouts'

export const mnemonic = process.env.MNEMONIC || ''

export const bscRpc = 'https://rpc.ankr.com/bsc'
export const involveAccountCount = 100
export const accounts = generateAccounts(mnemonic, involveAccountCount)
export const contractAddress = '0xa4Aff9170C34c0e38Fed74409F5742617d9E80dc'
