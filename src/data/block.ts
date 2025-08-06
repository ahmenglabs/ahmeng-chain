import { type Transaction } from "./transaction.js"

export type Block = {
  id: string
  previousBlockId: string | null
  timestamp: number
  transactions: Transaction[]
}
