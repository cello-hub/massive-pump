import axios from 'axios'
import {
  createPublicClient,
  createWalletClient,
  http,
  type Address,
  type Hex
} from 'viem'
import { type Account } from 'viem/accounts'
import { accounts, chain, inviteCode, rpc } from './constants'
import { setTimeout } from 'timers/promises'

const publicClient = createPublicClient({
  chain,
  transport: http(rpc)
})

// 获取 token
const getUserToken = async (account: Account) => {
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

// 签到
const signIn = async (account: Account, target: Address, data: Hex) => {
  const token = await getUserToken(account)
  const walletClient = createWalletClient({
    chain,
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
  // const signinPromises = accounts.map(async (account) => {
  //   return signIn(account,       '0xB342e7D33b806544609370271A8D074313B7bc30',
  //   '0xe95a644f0000000000000000000000000000000000000000000000000000000000000001')
  // }
  // accounts.forEach(async (account) => {
  //   await signIn(
  //     account,
  //     '0xB342e7D33b806544609370271A8D074313B7bc30',
  //     '0xe95a644f0000000000000000000000000000000000000000000000000000000000000001'
  //   )
  // })

  for (let i = 0; i < accounts.length; i++) {
    await signIn(
      accounts[i],
      '0xB342e7D33b806544609370271A8D074313B7bc30',
      '0xe95a644f0000000000000000000000000000000000000000000000000000000000000001'
    )
  }
  // signIn(
  //   accounts[0],
  //   '0xB342e7D33b806544609370271A8D074313B7bc30',
  //   '0xe95a644f0000000000000000000000000000000000000000000000000000000000000001'
  // )
}

run()
