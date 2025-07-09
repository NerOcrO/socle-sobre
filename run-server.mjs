import { Hono } from "hono"
import { compress } from "hono/compress"
import { serveStatic } from "hono/serve-static"

import { handler as ssrHandler } from "./dist/server/entry.mjs"

const app = new Hono()

app.use(compress())
app.use("/dist/client/*", serveStatic({ root: "./" }))
app.use(ssrHandler)

export default app
