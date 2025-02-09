import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { loadEnv } from '@/shared/env.ts'

loadEnv()

const app = new Hono()

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
