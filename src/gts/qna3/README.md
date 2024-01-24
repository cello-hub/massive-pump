官网: https://qna3.ai/vote

签到脚本 `signin.ts` 需先从 binance 提 bnb 到需要的账户, 再调用 run 方法签到

参数介绍

```ts
// 参与的链, opBNB 有额外20%加成
const chain = opBNB
// 助记词
const mnemonic = process.env.MNEMONIC || ''
// rpc 链接
const rpc = process.env.OPBNB_RPC
// 参与的账号数量
const involveAccountCount = 100
```
