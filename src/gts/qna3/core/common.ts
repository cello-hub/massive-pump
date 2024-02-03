import axios from 'axios'
import { createWalletClient, http, type Account, type Chain } from 'viem'
import { inviteCode } from './constants'

// 获取 token
export const getUserToken = async (
  account: Account,
  chain: Chain,
  rpc: string
) => {
  const walletClient = createWalletClient({
    chain,
    account,
    transport: http(rpc)
  })
  const signedMessage = await walletClient.signMessage({
    message: 'AI + DYOR = Ultimate Answer to Unlock Web3 Universe'
  })

  const response = await axios.post(
    'https://api.qna3.ai/api/v2/auth/login?via=wallet',
    {
      invite_code: inviteCode,
      signature: signedMessage,
      wallet_address: account.address
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://qna3.ai'
      }
    }
  )
  return response.data.data.accessToken
}
