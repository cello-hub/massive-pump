import axios from 'axios'
import {
  createPublicClient,
  createWalletClient,
  http,
  type Address,
  type Hex
} from 'viem'
import { type Account } from 'viem/accounts'
import { accounts, singInChain, contractAddress, rpc } from './core/constants'
import { setTimeout } from 'timers/promises'
import { getUserToken } from './core/common'

const publicClient = createPublicClient({
  chain: singInChain,
  transport: http(rpc)
})

// 签到
const signIn = async (account: Account, target: Address, data: Hex) => {
  const token = await getUserToken(account, singInChain, rpc)
  const walletClient = createWalletClient({
    chain: singInChain,
    account,
    transport: http(rpc)
  })

  const hash = await walletClient.sendTransaction({
    to: target,
    data
  })

  console.log(`${account.address} 签到交易hash: `, hash)

  await publicClient
    .waitForTransactionReceipt({
      hash
    })
    .then(async () => {
      console.log(`${account.address} 签到交易成功`)

      // 等待 1.5s, 防止签到失败
      await setTimeout(1500)
      await checkIn(token, hash, 'opbnb').then(() => {
        console.log(`${account.address} 签到成功`)
      })
    })
}

// 回传 签到交易 hash
const checkIn = async (token: string, hash: Hex, via: string) => {
  return axios
    .post(
      'https://api.qna3.ai/api/v2/my/check-in',
      {
        hash,
        via
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

const run = async () => {
  // 为防止意外失败, 可从指定账号顺序开始
  const start = 0
  for (let i = start; i < accounts.length; i++) {
    console.log(`index=${i}------------------`)

    await signIn(
      accounts[i],
      contractAddress,
      '0xe95a644f0000000000000000000000000000000000000000000000000000000000000001'
    )
  }
}

run()
