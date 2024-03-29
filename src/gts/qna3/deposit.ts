import { withdrawFromBinance } from '@/accouts'
import { accounts } from './core/constants'

// 给账户充值
const deposit = () => {
  accounts.forEach((account) => {
    withdrawFromBinance({
      address: account.address,
      coin: 'BNB',
      amount: 0.01,
      params: {
        network: 'OPBNB'
      }
    })
      .then(() => {
        console.log(`${account.address} 充值成功`)
      })
      .catch((err) => {
        console.log(`${account.address} 充值失败`, err)
      })
  })
}

deposit()
