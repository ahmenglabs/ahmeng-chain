import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { type Block } from "../types/block.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const blockDatabasePath = path.join(__dirname, "../data/blockDatabase.json")

if (!fs.existsSync(blockDatabasePath)) {
  fs.writeFileSync(blockDatabasePath, JSON.stringify([]))
}

const blockDatabase: Block[] = JSON.parse(fs.readFileSync(blockDatabasePath, "utf-8"))

const blockManager = {
  getLatestBlock: () => {
    return blockDatabase[blockDatabase.length - 1]
  },
  getBlockById: (id: string) => {
    return blockDatabase.find((block: Block) => block.id === id)
  },
  getBlocksByHeight: (height: number) => {
    return blockDatabase.filter((block: Block) => block.height === height)
  },
  addNewBlock: (block: Block) => {
    blockDatabase.push(block)
    fs.writeFileSync(blockDatabasePath, JSON.stringify(blockDatabase, null, 2))
  },
}

export default blockManager
