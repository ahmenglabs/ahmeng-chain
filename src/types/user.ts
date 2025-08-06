import { type Transaction } from "./transaction.js"

export type User = {
  address: string
  balance: number
  transactions: Transaction[]
}
