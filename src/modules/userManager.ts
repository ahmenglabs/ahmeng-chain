import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { type User } from "../types/user.js"
import { type Block } from "../types/block.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const userCachePath = path.join(__dirname, "../data/userCache.json")

if (!fs.existsSync(userCachePath)) {
  fs.writeFileSync(userCachePath, JSON.stringify([]))
}

const usersCache: User[] = JSON.parse(fs.readFileSync(userCachePath, "utf-8"))

const userManager = {
  getUserByAddress: (address: string): User | undefined => {
    return usersCache.find((user) => user.address === address)
  },
  addNewUser: (user: User): void => {
    if (!userManager.getUserByAddress(user.address)) {
      usersCache.push(user)
      fs.writeFileSync(userCachePath, JSON.stringify(usersCache, null, 2))
    }
  },
  parseNewBlock(block: Block): void {
    block.transactions.forEach((transaction) => {
      const user = userManager.getUserByAddress(transaction.fromAddress)
      if (!user) {
        userManager.addNewUser({
          address: transaction.fromAddress,
          balance: 0,
          transactions: [transaction],
        })
      } else {
        user.transactions.push(transaction)
        user.balance += transaction.amount
      }

      fs.writeFileSync(userCachePath, JSON.stringify(usersCache, null, 2))
    })
  },
}

export default userManager
