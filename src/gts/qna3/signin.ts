import axios from 'axios'
import {
  createPublicClient,
  createWalletClient,
  http,
  type Address,
  type Hex
} from 'viem'
import { generateAccounts } from '@/accouts'
import type { Account } from 'viem/accounts'
import { opBNB } from 'viem/chains'
import { withdrawFromBinance } from '@/accouts/withdraw'

const chain = opBNB
const mnemonic = process.env.MNEMONIC || ''
const rpc = process.env.OPBNB_RPC
const involveAccountCount = 100

const accounts = generateAccounts(mnemonic, involveAccountCount)

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
      signature: signedMessage,
      wallet_address: account.address
    }
  )

  return response.data.data.accessToken
}

// 签到
const signIn = async (account: Account, target: Address, data: Hex) => {
  const token = await getUserToken(account)
  console.log('token: ', token)

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

      await checkIn(token, hash, 'bnb')

      console.log(`${account.address} 签到成功`)
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
          Authorization: 'Bearer ' + token
        }
      }
    )
    .then(() => {})
}

// 给账户充值
const deposit = () => {
  accounts.forEach((account) => {
    withdrawFromBinance(account.address, 'BNB', 0.01)
      .then(() => {
        console.log(`${account.address} 充值成功`)
      })
      .catch((err) => {
        console.log(`${account.address} 充值失败`, err)
      })
  })
}

const run = () => {
  accounts.forEach((account) => {
    signIn(
      account,
      '0xB342e7D33b806544609370271A8D074313B7bc30',
      '0xe95a644f0000000000000000000000000000000000000000000000000000000000000001'
    )
  })
}

// deposit()
run()
