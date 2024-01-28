官网: https://qna3.ai/vote

变量配置见 `constants.ts`

## 生成随机助记词

执行下面命令生成助记词

```shell
bun run src/accouts/mnemonic.ts
```

将结果写入 .env 文件变量 `MNEMONIC`

## 提币

- 币安创建 API, 勾选提币功能
- 创建 .env 文件写入变量 `BINANCE_APIKEY` 和 `BINANCE_SECRETKEY`

## 执行签到脚本

执行签到

```shell
bun run src/gts/qna3/signin.ts
```
