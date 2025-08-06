import { type Transaction } from "../types/transaction.js"

const pendingTransaction: Transaction[] = []

const transactionManager = {
  getTotalPendingTransactions: () => {
    return pendingTransaction.length
  },
  getAllPendingTransactions: () => {
    return pendingTransaction
  },
  addNewPendingTransaction: (transaction: Transaction) => {
    pendingTransaction.push(transaction)
  },
  removePendingTransaction: (transactionId: string) => {
    const index = pendingTransaction.findIndex((tx) => tx.id === transactionId)
    if (index !== -1) {
      pendingTransaction.splice(index, 1)
    }
  },
}

export default transactionManager
