export type TransactionType = "transfer" | "deploy" | "execute"

export type Transaction = {
  id: string
  timestamp: number
  transactionType: TransactionType
  fromAddress: string
  toAddress: string
  amount: number
  functionName?: string
  args?: string[]
}
