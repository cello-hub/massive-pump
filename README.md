> "massive pump" means "巨大的泵"

# 运行

安装 vscode 插件**Code Runner**

安装依赖

```bash
bun i
```

打开 ts 文件, 点击右上角的运行按钮或者

Or

```bash
bun run src/<file_path>
```

## 已集成脚本

- [qna3](https://qna3.ai/vote)

## 提币

支持从归集账户、okx、binance 提币。为防止被认为是女巫, 建议从交易所提币。

注意: 从 okx 提币, 地址需要在白单内(不建议)。从 binance 提币需要设置 ip, 使用代理的情况下, 通过 [ip地址查询](https://nordvpn.com/zh/ip-lookup) 获取你的代理服务器地址

提币方法见 `src/accouts/withdraw.ts`

## Issue

If the changes made to .prettierrc are not taking effect, please try restarting VSCode.
