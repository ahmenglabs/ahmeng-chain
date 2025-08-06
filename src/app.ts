import { serve } from "@hono/node-server"
import { Hono } from "hono"

const app = new Hono()
const server = serve(app)

app.get("/", (ctx) => {
  return ctx.json({ status: 200, message: "Ahmeng Chain is running!" })
})

process.on("SIGINT", () => {
  server.close()
  process.exit(0)
})

process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})
