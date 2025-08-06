import { type Transaction } from "./transaction.js"

export type Block = {
  id: string
  height: number
  previousBlockId: string | null
  timestamp: number
  transactions: Transaction[]
  nonce: number
}
