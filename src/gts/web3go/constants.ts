import { generateAccounts } from '@/accouts'

export const mnemonic = process.env.MNEMONIC || ''

export const rpc = ''
export const involveAccountCount = 100
export const accounts = generateAccounts(mnemonic, involveAccountCount)
