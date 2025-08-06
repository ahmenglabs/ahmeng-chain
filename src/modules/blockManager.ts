import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { type Block } from "../types/block.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const databasePath = path.join(__dirname, "../data/database.json")

if (!fs.existsSync(databasePath)) {
  fs.writeFileSync(databasePath, JSON.stringify([]))
}

const database = JSON.parse(fs.readFileSync(databasePath, "utf-8"))

const blockManager = {
  getLatestBlock: () => {
    return database.blocks[database.blocks.length - 1]
  },
  getBlockById: (id: string) => {
    return database.blocks.find((block: Block) => block.id === id)
  },
  getBlocksByHeight: (height: number) => {
    return database.blocks.filter((block: Block) => block.height === height)
  },
  addNewBlock: (block: Block) => {
    database.blocks.push(block)
    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2))
  },
}

export default blockManager
