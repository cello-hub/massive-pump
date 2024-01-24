import { english, generateMnemonic } from 'viem/accounts'

/**
 * 生成随机助记词
 */
export const generateRandomMnemonic = () => {
  return generateMnemonic(english)
}

console.log(generateRandomMnemonic())
