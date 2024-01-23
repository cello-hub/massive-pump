import type { Account } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'

/**
 * 由助记词生成多个钱包地址
 * @param mnemonic 助记词
 * @param length 由助记词生成的钱包地址数量
 * @returns
 */
export const generateAccounts = (mnemonic: string, length: number) => {
  const accounts: Account[] = []

  for (let i = 0; i < length; i++) {
    accounts.push(
      mnemonicToAccount(mnemonic, {
        addressIndex: i
      })
    )
  }

  return accounts
}
