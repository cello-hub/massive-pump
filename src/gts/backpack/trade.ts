const HOST = 'https://api.backpack.exchange'

interface TradeExecuteOrder {
  clientId?: number
  orderType: 'Market' | 'Limit'
  postOnly?: boolean
  price?: string
  quantity?: string
  quoteQuantity?: string
  selfTradePrevention?: 'RejectTaker' | 'RejectMaker' | 'RejectBoth' | 'Allow'
  side: 'Bid' | 'Ask'
  symbol: string
  timeInForce?: 'GTC' | 'IOC' | 'FOK' // Good Till Cancelled, Immediate or Cancel, Fill or Kill
  triggerPrice?: string
}

const signature = (
  secret: string,
  data: TradeExecuteOrder,
  timestamp: number
) => {}

const headers = () => {
  return {
    'X-Timestamp': '',
    'X-Window': '60000',
    'X-API-Key': process.env.BACKPACK_APIKEY,
    'X-Signature': ''
  }
}
