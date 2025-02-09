import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { env } from './shared/env.ts'

const app = new Hono()

const port = env.PORT
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
