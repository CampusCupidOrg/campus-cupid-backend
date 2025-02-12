import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { env } from './shared/env.ts'
import { auth } from './routes/auth.route.ts'

const app = new Hono()

const port = env.PORT
console.log(`Server is running on http://localhost:${port}`)

app.route('/auth', auth)
app.get('/', (c) => c.json({ message: 'Hello, World!' }))


serve({
  fetch: app.fetch,
  port
})
