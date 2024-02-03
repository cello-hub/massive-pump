import axios from 'axios'
import {
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  http,
  type Account,
  type Hex
} from 'viem'
import ABI from './core/abi'

import { accounts, bnbRpc, claimChain, contractAddress } from './core/constants'
import { getUserToken } from './core/common'
import { setTimeout } from 'timers/promises'

const publicClient = createPublicClient({
  chain: claimChain,
  transport: http(bnbRpc)
})

const claim = async (account: Account) => {
  const token = await getUserToken(account, claimChain, bnbRpc)
  const { data: response } = await axios.post<{
    data: {
      signature: {
        nonce: number
        result: string
        signature: Hex
      }
      amount: number
      history_id: number
      created_at: string
    }
  }>(
    'https://api.qna3.ai/api/v2/my/claim-all',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://qna3.ai',
        Authorization: 'Bearer ' + token
      }
    }
  )
  const data = response.data
  const encodedData = encodeFunctionData({
    abi: ABI,
    functionName: 'claimCredit',
    args: [data.amount, data.signature.nonce, data.signature.signature]
  })

  const walletClient = createWalletClient({
    chain: claimChain,
    account,
    transport: http(bnbRpc)
  })

  const hash = await walletClient.sendTransaction({
    to: contractAddress,
    data: encodedData
  })

  await publicClient
    .waitForTransactionReceipt({
      hash
    })
    .then(async () => {
      console.log(`${account.address} Claim交易成功`)

      // 等待 1.5s, 防止签到失败
      await setTimeout(1500)
      await callbackClaim(data.history_id, hash, token).then(() => {
        console.log(`${account.address} Claim成功`)
      })
    })
}

const callbackClaim = async (historyId: number, hash: Hex, token: string) => {
  return axios
    .post(
      `https://api.qna3.ai/api/v2/my/claim/${historyId}`,
      {
        hash
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://qna3.ai',
          Authorization: 'Bearer ' + token
        }
      }
    )
    .catch((e) => {
      console.log(e)
    })
}

claim(accounts[0])
