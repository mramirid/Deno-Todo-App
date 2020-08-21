import { Application } from "https://deno.land/x/oak/mod.ts"

import { connectDB } from './helpers/db_client.ts'
import todosRoutes from './routes/todos.ts'

connectDB()

const app = new Application()

app.use(async (ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  await next()
})

app.use(todosRoutes.routes())
app.use(todosRoutes.allowedMethods())

await app.listen({ port: 8080 })